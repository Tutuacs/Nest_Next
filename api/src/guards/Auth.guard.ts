import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthFunctionsService } from 'src/auth/auth-functions/auth-functions.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly authFunctions: AuthFunctionsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const token = this.extractTokenFromHeader(request);
      const data = await this.authService.checkToken(token);
      const profile = await this.authFunctions.profileInfo(data.id);

      request.profile = profile;

      return true;
    } catch {
      console.log({
        AuthGuard:
          'src/guards/AuthGuard: Token não identificado.(token não valido)',
      });
      return false;
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
