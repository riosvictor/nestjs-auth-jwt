import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidationError,
  validateSync,
} from 'class-validator';
import { CACHE_TTL_MINUTES, JWT } from '@/common/constants';
import { Environment } from '@/common/enums';

class EnvironmentVariables {
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
  CACHE_TTL_IN_MINUTES: number = CACHE_TTL_MINUTES;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const validationError = new ValidationError();
    validationError.constraints = errors.reduce((acc, val) => {
      acc[val.property] = Object.values(val.constraints);
      return acc;
    }, {});
    throw validationError;
  }
  return validatedConfig;
}
