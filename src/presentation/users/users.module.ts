import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { HashBcryptoService } from '@/application/services';
import { IHashService } from '@/adapters/interfaces';
import { strategyRepositoryProvider } from '@/adapters/strategies';
import { UserRepository } from '@/domain/repositories';
import { UserSchema } from '@/infra/db/typeorm/users';
import { createUserUseCase, getAllUsersUseCase } from './factories';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [
    strategyRepositoryProvider(),
    {
      provide: IHashService,
      useClass: HashBcryptoService,
    },
    {
      provide: CreateUserUseCase,
      useFactory: createUserUseCase,
      inject: [UserRepository, IHashService],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: getAllUsersUseCase,
      inject: [UserRepository, IHashService],
    },
  ],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule {}
