import { ICommand } from '@nestjs/cqrs';
import { OrderItem } from '../../domain/entities/order.entity';

export class CreateOrderCommand implements ICommand {
  constructor(
    public readonly clientId: string,
    public readonly items: OrderItem[],
  ) {}
}