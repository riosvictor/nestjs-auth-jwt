export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
}

export class Order {
  public status: OrderStatus = OrderStatus.PENDING;
  public readonly createdAt: Date = new Date();

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public totalPrice: number,
    public readonly items?: OrderItem[],
  ) {
    this.items = items ? [...items] : [];
  }

  changeStatus(newStatus: OrderStatus): void {
    if (this.status === newStatus) return;
    this.status = newStatus;
  }
}