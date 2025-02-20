import { Order } from "../../domain/entities/order.entity";

export interface IOrderRepository {
  insert(order: Order): Promise<void>;
  getById(orderId: string): Promise<Order>;
}
