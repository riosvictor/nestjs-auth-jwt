import { IOrderRepository } from "../../application/interfaces/order.repository.interface";
import { Order } from "../../domain/entities/order.entity";

export class OrderMemoryRepository implements IOrderRepository {
  private ordersList: Order[] = [];
  
  async insert(newOrder: Order) {
    this.ordersList.push(newOrder);
  }

  async getById(orderId: string) {
    return this.ordersList.find(p => p.id === orderId);
  }
}