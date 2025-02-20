import { Order } from "../../../../src/domain/entities/order.entity";
import { OrderMemoryRepository } from "../../../../src/infra/repositories/order-memory.repository";

describe('OrderMemoryRepository', () => {
  let repository: OrderMemoryRepository;

  beforeEach(() => {
    repository = new OrderMemoryRepository();
  });

  it('should insert a new order into the repository', async () => {
    const order = new Order('1', 'customer-1');
    await repository.insert(order);

    const retrievedOrder = await repository.getById('1');
    expect(retrievedOrder).toEqual(order);
  });

  it('should retrieve an order by its ID', async () => {
    const order1 = new Order('1', 'customer-1');
    const order2 = new Order('2', 'customer-2');
    await repository.insert(order1);
    await repository.insert(order2);

    const retrievedOrder = await repository.getById('2');
    expect(retrievedOrder).toEqual(order2);
  });

  it('should return undefined if order ID does not exist', async () => {
    const order = new Order('1', 'customer-1');
    await repository.insert(order);

    const retrievedOrder = await repository.getById('non-existent-id');
    expect(retrievedOrder).toBeUndefined();
  });
});