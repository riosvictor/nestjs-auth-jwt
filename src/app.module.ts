import { Module } from '@nestjs/common';
import { UsersController } from '@/presentation/users.controller';
import {
  CreateUserUseCase,
  FindOneUserToAuthUseCase,
  GetAllUsersUseCase,
} from '@/application/usecases';
import { AuthController } from '@/presentation/auth.controller';
import { UserRepository } from '@/application/repositories';
import { UsersCacheMemoryRepository } from '@/adapters/data/cache-memory/users';
import { AuthService } from '@/application/services';
import { GlobalModule } from '@/common/global/global.module';

@Module({
  imports: [GlobalModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UsersCacheMemoryRepository,
    },

    CreateUserUseCase,
    GetAllUsersUseCase,
    FindOneUserToAuthUseCase,
    AuthService,
  ],
  controllers: [UsersController, AuthController],
})
export class AppModule {}
