import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

export const CACHE_MODULE_CONFIG = (
  _configService: ConfigService,
): CacheModuleOptions => ({
  ttl: _configService.get<number>('CACHE_TTL_IN_MINUTES') * 60 * 1000,
});
