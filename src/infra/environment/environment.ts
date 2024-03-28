import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.class-validator';

@Injectable()
export class Environment {
  constructor(private _configService: ConfigService<EnvironmentVariables>) {}

  get cacheTtlInMinutes(): number {
    return this._configService.get('CACHE_TTL_IN_MINUTES');
  }

  get jwtExpiresInMinutes(): number {
    return this._configService.get('JWT_EXPIRES_IN_MINUTES');
  }

  get nodeEnv(): string {
    return this._configService.get('NODE_ENV');
  }

  get jwtRefreshExpiresInMinutes(): number {
    return this._configService.get('JWT_REFRESH_EXPIRES_IN_MINUTES');
  }

  get jwtRefreshSecret(): string {
    return this._configService.get('JWT_REFRESH_SECRET');
  }

  get jwtSecret(): string {
    return this._configService.get('JWT_SECRET');
  }

  get port(): number {
    return this._configService.get('PORT');
  }

  get rateLimitRequests(): number {
    return this._configService.get('RATE_LIMIT_REQUESTS');
  }

  get rateLimitTtlMinutes(): number {
    return this._configService.get('RATE_LIMIT_TTL_MINUTES');
  }
}
