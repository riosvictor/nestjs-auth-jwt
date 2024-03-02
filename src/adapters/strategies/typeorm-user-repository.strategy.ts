import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { IRepositoryStrategy } from '@/adapters/interfaces';
import { UserRepository } from '@/domain/repositories';
import { UserEntity } from '@/domain/entities';
import { UsersTypeOrmRepository } from '@/infra/db/typeorm/users';

export class TypeOrmUserRepositoryStrategy implements IRepositoryStrategy {
  getProvider(): Provider {
    return {
      provide: UserRepository,
      useFactory(dataSource: DataSource) {
        return new UsersTypeOrmRepository(dataSource.getRepository(UserEntity));
      },
      inject: [getDataSourceToken()],
    };
  }
}
