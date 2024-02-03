import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { UserRepository } from '@/domain/repositories';
import { IHashService } from '@/adapters/interfaces';
import { HashBcryptoService } from '@/application/services';
import { UserSchema, UsersTypeOrmRepository } from '@/infra/db/typeorm/users';
import { UserEntity } from '@/domain/entities';
import { createUserUseCase, getAllUsersUseCase } from './factories';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [
    {
      provide: UserRepository,
      useFactory(dataSource: DataSource) {
        return new UsersTypeOrmRepository(dataSource.getRepository(UserEntity));
      },
      inject: [getDataSourceToken()],
    },
    // {
    //   provide: UserRepository,
    //   useClass: UsersInMemoryRepository,
    // },
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
