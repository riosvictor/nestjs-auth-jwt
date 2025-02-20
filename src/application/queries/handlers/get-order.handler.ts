import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from '../get-order.query';
import { OrderService } from '../../../domain/services/order.service';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderQuery> {
  constructor(private readonly orderService: OrderService) {}
  
  async execute(query: GetOrderQuery) {
    const order = await this.orderService.getOrder(query.orderId);
    
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}