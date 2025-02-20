import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../create-order.command';
import { OrderService } from '../../../domain/services/order.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderService: OrderService) {}
  
  async execute(command: CreateOrderCommand) {
    return this.orderService.createOrder(command.clientId, command.items);
  }
}