import { Order, OrderItem, OrderStatus } from "../../../../src/domain/entities/order.entity";

describe('Order Entity', () => {
  it('should create an order with default status and createdAt', () => {
    const order = new Order('1', 'customer-1');

    expect(order.status).toBe(OrderStatus.PENDING);
    expect(order.createdAt).toBeInstanceOf(Date);
    expect(order.id).toBe('1');
    expect(order.customerId).toBe('customer-1');
    expect(order.totalPrice).toBe(0);
    expect(order.items).toEqual([]);
  });

  it('should initialize order with items if provided', () => {
    const items: OrderItem[] = [
      { productId: 'product-1', quantity: 2, price: 50 },
      { productId: 'product-2', quantity: 1, price: 50 },
    ];
    const order = new Order('1', 'customer-1', items);

    expect(order.items).toEqual(items);
  });

  it('should change the order status', () => {
    const order = new Order('1', 'customer-1');
    order.changeStatus(OrderStatus.CONFIRMED);

    expect(order.status).toBe(OrderStatus.CONFIRMED);
  });

  it('should not change the status if the new status is the same', () => {
    const order = new Order('1', 'customer-1');
    order.changeStatus(OrderStatus.PENDING);

    expect(order.status).toBe(OrderStatus.PENDING);
  });
});