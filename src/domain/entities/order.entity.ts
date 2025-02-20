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
  public totalPrice: number;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items?: OrderItem[],
  ) {
    this.items = items ? [...items] : [];
    this.totalPrice = this.calculateTotalPrice();
  }

  private calculateTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  changeStatus(newStatus: OrderStatus): void {
    if (this.status === newStatus) return;
    this.status = newStatus;
  }
}