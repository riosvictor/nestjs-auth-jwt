import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_MODULE_CONFIG = (
  _configService: ConfigService,
): JwtModuleOptions => ({
  secret: _configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: `${_configService.get<number>('JWT_EXPIRES_IN_MINUTES')}m`,
  },
});
