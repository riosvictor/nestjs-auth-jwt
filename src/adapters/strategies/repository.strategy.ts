import { Provider } from '@nestjs/common';
import { IRepositoryStrategy } from '@/adapters/interfaces';
import { TypeOrmUserRepositoryStrategy } from './typeorm-user-repository.strategy';
import { InMemoryUserRepositoryStrategy } from './in-memory-user-repository.strategy';

export const strategyRepositoryProvider = (): Provider => {
  const envNode = process.env.NODE_ENV;
  let strategy: IRepositoryStrategy;

  switch (envNode) {
    case 'production':
      strategy = new TypeOrmUserRepositoryStrategy();
      break;
    default:
      strategy = new InMemoryUserRepositoryStrategy();
  }

  return strategy.getProvider();
};
