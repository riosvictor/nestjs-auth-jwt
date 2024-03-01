import { Provider } from '@nestjs/common';
import { IRepositoryStrategy } from '@/adapters/interfaces';
import { UserRepository } from '@/domain/repositories';
import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';

export class InMemoryUserRepositoryStrategy implements IRepositoryStrategy {
  getProvider(): Provider {
    return {
      provide: UserRepository,
      useClass: UsersInMemoryRepository,
    };
  }
}
