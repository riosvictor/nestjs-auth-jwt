import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Environment } from '@/common/enums';
import { CACHE_TTL_IN_MINUTES, JWT, RATE_LIMIT } from '@/common/constants';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @IsOptional()
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  JWT_EXPIRES_IN_MINUTES: number = JWT.OPTIONS.EXPIRES_IN_MINUTES;

  @IsNumber()
  @Min(10)
  @IsOptional()
  JWT_REFRESH_EXPIRES_IN_MINUTES: number =
    JWT.OPTIONS.REFRESH_EXPIRES_IN_MINUTES;

  @IsNumber()
  @Min(1)
  @IsOptional()
  CACHE_TTL_IN_MINUTES: number = CACHE_TTL_IN_MINUTES;

  @IsNumber()
  @Min(5)
  @IsOptional()
  RATE_LIMIT_TTL_MINUTES: number = RATE_LIMIT.TTL_MINUTES;

  @IsNumber()
  @Min(10)
  @IsOptional()
  RATE_LIMIT_REQUESTS: number = RATE_LIMIT.REQUESTS;
}
