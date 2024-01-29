import { CacheModuleAsyncOptions, CacheStore } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const CACHE_MODULE_CONFIG = async (_configService: ConfigService) =>
  _configService.get<string>('NODE_ENV') === 'test'
    ? {}
    : ({
        store: redisStore as unknown as CacheStore,
        socket: {
          host: _configService.get<string>('REDIS_HOST'),
          port: _configService.get<number>('REDIS_PORT'),
        },
        // NUMBER IN SECONDS
        ttl: _configService.get<number>('CACHE_TTL_MINUTES') * 60,
      } as CacheModuleAsyncOptions);
