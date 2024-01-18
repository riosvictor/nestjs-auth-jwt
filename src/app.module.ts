import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthPassportModule } from './auth-passport/auth-passport.module';

@Module({
  imports: [AuthModule, UsersModule, AuthPassportModule],
  providers: [
    // To activate the private endpoint to entire application
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
