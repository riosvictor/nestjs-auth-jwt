import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../application/commands/create-order.command';
import { GetOrderQuery } from '../../application/queries/get-order.query';
import { OrderItem } from '../../domain/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async criar(@Body() body: { customerId: string; items: OrderItem[] }) {
    return this.commandBus.execute(new CreateOrderCommand(body.customerId, body.items));
  }
  
  @Get(':id')
  async obter(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderQuery(id));
  }
}