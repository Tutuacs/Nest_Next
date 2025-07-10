import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsStrongPassword, IsNumber, Min, Max, IsBase64, IsEmpty, IsEnum, } from 'class-validator';
import { ROLE } from 'src/decorators';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(ROLE)
  role: number;

  @IsOptional()
  @IsBase64()
  image: string;

}
