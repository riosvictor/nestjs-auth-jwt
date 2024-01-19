import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '../common/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT.SECRET,
      signOptions: JWT.OPTIONS,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
