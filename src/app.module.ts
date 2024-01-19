import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtPassportGuard } from './guards';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtPassportGuard,
    },
  ],
})
export class AppModule {}
