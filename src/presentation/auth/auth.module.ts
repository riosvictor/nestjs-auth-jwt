import { Module } from '@nestjs/common';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { UserRepository } from '@/domain/repositories';
import { AuthService, HashBcryptoService } from '@/application/services';
import { IHashService } from '@/adapters/interfaces';
import { UsersModule } from '@/presentation/users/users.module';
import { AuthController } from './auth.controller';
import { findOneUserToAuthUseCase } from './factories';

@Module({
  imports: [UsersModule],
  providers: [
    {
      provide: IHashService,
      useClass: HashBcryptoService,
    },
    {
      provide: FindOneUserToAuthUseCase,
      useFactory: findOneUserToAuthUseCase,
      inject: [UserRepository],
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
