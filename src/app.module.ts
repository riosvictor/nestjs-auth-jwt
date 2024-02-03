import { Module } from '@nestjs/common';
import { GlobalModule } from '@/presentation/global/global.module';
import { AuthModule } from '@/presentation/auth/auth.module';
import { UsersModule } from './presentation/users/users.module';

@Module({
  imports: [GlobalModule, AuthModule, UsersModule],
})
export class AppModule {}
