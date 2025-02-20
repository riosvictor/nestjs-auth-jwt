import { Logger, Provider } from '@nestjs/common';
import { OrderMemoryRepository } from './order-memory.repository';
import { OrderDynamoDBRepository } from './order-dynamodb.repository';
import { ConfigService } from '@nestjs/config';

export const OrderRepositoryProvider: Provider = {
  provide: 'OrderRepository',
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('OrderRepositoryProvider');

    logger.log(`Creating OrderRepository for ${process.env.DB || 'memory'}`);

    if (process.env.DB === 'dynamodb') {
      return new OrderDynamoDBRepository(configService);
    }
    return new OrderMemoryRepository();
  },
  inject: [ConfigService],
};
