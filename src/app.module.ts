import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderService } from './domain/services/order.service';
import { OrderMemoryRepository } from './infra/repositories/order-memory.repository';
import { CreateOrderCommandHandler } from './application/commands/handlers/create-order.handler';
import { GetOrderQueryHandler } from './application/queries/handlers/get-order.handler';
import { CreateOrderCommand } from './application/commands/create-order.command';
import { GetOrderQuery } from './application/queries/get-order.query';
import { OrderRepositoryProvider } from './infra/repositories/repository.provider';

@Module({
  imports: [
    CqrsModule, 
    ConfigModule.forRoot()
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    CreateOrderCommandHandler,
    CreateOrderCommand,
    GetOrderQueryHandler,
    GetOrderQuery,
    OrderRepositoryProvider
  ],
})
export class AppModule {}
