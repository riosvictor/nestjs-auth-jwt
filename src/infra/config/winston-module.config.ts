import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

const { combine, ms, timestamp, json, colorize } = format;

export const WINSTON_MODULE_CONFIG = (
  _configService: ConfigService,
): WinstonModuleOptions => {
  const IS_DEVELOPMENT =
    _configService.get<string>('NODE_ENV') === 'development';

  return {
    level: IS_DEVELOPMENT ? 'debug' : 'error',
    format: combine(timestamp(), ms(), json(), colorize({ all: true })),
    transports: [new transports.Console()],
  };
};
