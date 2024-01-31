import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Environment } from '@/common/enums';
import { CACHE_TTL_IN_MINUTES, JWT } from '@/common/constants';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsNumber()
  @Min(1)
  JWT_EXPIRES_IN_MINUTES: number = JWT.OPTIONS.EXPIRES_IN_MINUTES;

  @IsNumber()
  @Min(10)
  JWT_REFRESH_EXPIRES_IN_MINUTES: number =
    JWT.OPTIONS.REFRESH_EXPIRES_IN_MINUTES;

  @IsNumber()
  @Min(1)
  CACHE_TTL_IN_MINUTES: number = CACHE_TTL_IN_MINUTES;
}
