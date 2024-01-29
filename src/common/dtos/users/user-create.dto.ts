import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  id?: string;

  @IsString()
  @MinLength(10)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
