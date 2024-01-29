import { ConfigService } from '@nestjs/config';

export const JWT_MODULE_CONFIG = async (_configService: ConfigService) => ({
  secret: _configService.get<string>('JWT_SECRET'),
  signOptions: {
    // PATTERS ALLOWED "20h", 60 (in seconds)
    expiresIn: _configService.get<number>('JWT_EXPIRES_IN_MINUTES') * 60,
  },
});
