import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from '../Validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthFunctionsService extends PrismaService {
  async findLogin(login: LoginDto) {

    const profile = await this.profile.findFirst({
      where: {
        email: login.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });
    if (profile && (await bcrypt.compare(login.password, profile.password))) {
      return {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.name,
      };
    } else {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
  }

  async register(register: RegisterDto) {
    const profile = await this.existProfileEmail(register.email);
    if (profile) {
      throw new ConflictException('Email já cadastrado');
    }
    return this.profile.create({
      data: {
        email: register.email,
        name: register.name,
        password: await bcrypt.hash(register.password, 10),
        role: register.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async profileInfo(id: string) {
    return this.profile.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
