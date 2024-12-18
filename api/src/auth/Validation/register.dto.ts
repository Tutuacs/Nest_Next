import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsStrongPassword, IsNumber, Min, Max, IsBase64, IsEmpty, } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

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
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  role: number;

  @IsOptional()
  @IsBase64()
  image: string;

}
