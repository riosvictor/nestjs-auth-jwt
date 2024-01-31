import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const RATE_LIMIT_MODULE_CONFIG = (
  _configService: ConfigService,
): ThrottlerModuleOptions => [
  {
    ttl: _configService.get<number>('RATE_LIMIT_TTL_MINUTES') * 60 * 1000,
    limit: _configService.get<number>('RATE_LIMIT_REQUESTS'),
  },
];
