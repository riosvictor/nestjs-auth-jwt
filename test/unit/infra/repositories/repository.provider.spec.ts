import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OrderRepositoryProvider } from '../../../../src/infra/repositories/repository.provider';
import { OrderMemoryRepository } from '../../../../src/infra/repositories/order-memory.repository';
import { OrderDynamoDBRepository } from '../../../../src/infra/repositories/order-dynamodb.repository';

describe('OrderRepositoryProvider', () => {
  function createModule(db: string) {
    return Test.createTestingModule({
      providers: [
        OrderRepositoryProvider,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(db),
          },
        },
      ],
    }).compile();
  }

  it('should provide OrderMemoryRepository if DB is not dynamodb', async () => {
    process.env.DB = 'memory';
    const module = await createModule('memory');
    const repository = module.get('OrderRepository');    

    expect(repository).toBeInstanceOf(OrderMemoryRepository);
  });

  it('should provide OrderDynamoDBRepository if DB is dynamodb', async () => {
    process.env.DB = 'dynamodb';
    const module = await createModule('dynamodb');
    const repository = module.get('OrderRepository');

    expect(repository).toBeInstanceOf(OrderDynamoDBRepository);
  });

  it('should provide OrderMemoryRepository if DB is not set', async () => {
    delete process.env.DB;
    const module = await createModule('');
    const repository = module.get('OrderRepository');

    expect(repository).toBeInstanceOf(OrderMemoryRepository);
  });
});