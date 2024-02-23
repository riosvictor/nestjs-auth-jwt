import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

const { combine, ms, timestamp, json, colorize } = format;

export const WINSTON_MODULE_CONFIG = (
  _configService: ConfigService,
): WinstonModuleOptions => ({
  level:
    _configService.get<string>('NODE_ENV') === 'development'
      ? 'debug'
      : 'error',
  format: combine(timestamp(), ms(), json(), colorize({ all: true })),
  transports: [new transports.Console()],
});
