import { ConfigService } from '@nestjs/config';

export const CACHE_MODULE_CONFIG = async (_configService: ConfigService) => ({
  // NUMBER IN MILLISECONDS
  ttl: _configService.get<number>('CACHE_TTL_MINUTES') * 60 * 1000,
});
