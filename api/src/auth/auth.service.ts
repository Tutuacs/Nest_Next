import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './Validation/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './Validation';
import { AuthFunctionsService } from './auth-functions/auth-functions.service';
import { env } from 'process';

@Injectable()
export class AuthService {
  private audience = 'profile';
  private issuer = 'auth-token';
  private refreshAudience = 'refresh';
  private refreshIssuer = 'refresh-token';
  private EXPIRE_TIME = 20 * 1000;

  constructor(
    private readonly authFunctions: AuthFunctionsService,
    private readonly jwt: JwtService,
  ) { }

  async login(login: LoginDto) {
    const user = await this.authFunctions.findLogin(login);
    return this.createTokens(user);
  }

  async register(register: RegisterDto) {
    if (register.name) {
      if (register.name.length === 0) {
        register.name = register.email.split('@')[0];
      }
    }
    register.name = register.email.split('@')[0];
    return this.authFunctions.register(register);
  }

  async createToken(profile: {
    id: string;
    email: string;
    role: number;
    name: string | null;
  }) {
    return {
      token: await this.jwt.signAsync(
        {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          name: profile.name,
        },
        {
          expiresIn: '20s',
          subject: profile.id,
          issuer: this.issuer,
          audience: this.audience,
          secret: env.JWT_TOKEN_SECRET,
        },
      ),
    };
  }

  async createRefreshToken(profile: {
    id: string;
    email: string;
    role: number;
    name: string | null;
  }) {
    return {
      token: await this.jwt.signAsync(
        {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          name: profile.name,
        },
        {
          expiresIn: '7d',
          subject: profile.id,
          issuer: this.refreshIssuer,
          audience: this.refreshAudience,
          secret: env.JWT_REFRESH_SECRET,
        },
      ),
    };
  }

  async createTokens(profile: {
    id: string;
    email: string;
    role: number;
    name: string | null;
  }) {
    const token = (await this.createToken(profile)).token;
    const refreshToken = (await this.createRefreshToken(profile)).token;

    const tokens = {
      profile,
      tokens: {
        access: token,
        refresh: refreshToken,
        expiresIn: new Date().setTime(new Date().getTime() + this.EXPIRE_TIME),
      },
    };

    return tokens;
  }

  async refreshTokens(profile: {
    id: string;
    email: string;
    role: number;
    name: string;
  }) {
    const token = (await this.createToken(profile)).token;
    const refreshToken = (await this.createRefreshToken(profile)).token;
    const atualizedProfile = await this.authFunctions.profileInfo(profile.id);

    return {
      profile: atualizedProfile,
      access: token,
      refresh: refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + this.EXPIRE_TIME),
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
        secret: env.JWT_TOKEN_SECRET,
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  async checkRefreshToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: this.refreshAudience,
        issuer: this.refreshIssuer,
        secret: env.JWT_REFRESH_SECRET,
      });

      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  validToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  validRefreshToken(token: string) {
    try {
      this.checkRefreshToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
