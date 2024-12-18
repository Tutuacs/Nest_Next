import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthFunctionsService } from './auth-functions/auth-functions.service';

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: env.JWT_SECRET })],
  providers: [AuthService, AuthFunctionsService],
  controllers: [AuthController],
  exports: [AuthService, AuthFunctionsService],
})
export class AuthModule {}
