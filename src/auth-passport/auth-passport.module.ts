import { Module } from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthPassportController } from './auth-passport.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from '../common/constants';
import { JwtStrategy, LocalStrategy } from './strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: jwt.options,
    }),
  ],
  providers: [AuthPassportService, LocalStrategy, JwtStrategy],
  controllers: [AuthPassportController],
})
export class AuthPassportModule {}
