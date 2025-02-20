import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Order, OrderItem } from "../entities/order.entity";
import { IOrderRepository } from "../../application/interfaces/order.repository.interface";

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository') private readonly orderRepository: IOrderRepository
  ) {}
  
  private validator(orderItems: OrderItem[]) {
    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    orderItems.forEach(item => {
      if (!item.productId || !item.quantity || !item.price) {
        throw new BadRequestException('Itens must have productId, quantity and price');
      }
    });
  }

  async createOrder(customerId: string, orderItems: OrderItem[]) {
    this.validator(orderItems);

    const newOrder = new Order(
      crypto.randomUUID(),
      customerId,
      orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
      orderItems,
    );
    await this.orderRepository.insert(newOrder);
    return newOrder;
  }

  async getOrder(orderId: string) {
    return this.orderRepository.getById(orderId);
  }
}