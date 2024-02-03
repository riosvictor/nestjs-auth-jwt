import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

const CACHE_TTL_IN_MINUTES = 10;
const JWT_EXPIRES_IN_MINUTES = 5;
const JWT_REFRESH_EXPIRES_IN_MINUTES = 10;
const RATE_LIMIT_TTL_MINUTES = 5;
const RATE_LIMIT_REQUESTS = 10;

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

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

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  JWT_EXPIRES_IN_MINUTES: number = JWT_EXPIRES_IN_MINUTES;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  JWT_REFRESH_EXPIRES_IN_MINUTES: number = JWT_REFRESH_EXPIRES_IN_MINUTES;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  CACHE_TTL_IN_MINUTES: number = CACHE_TTL_IN_MINUTES;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  RATE_LIMIT_TTL_MINUTES: number = RATE_LIMIT_TTL_MINUTES;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  RATE_LIMIT_REQUESTS: number = RATE_LIMIT_REQUESTS;
}
