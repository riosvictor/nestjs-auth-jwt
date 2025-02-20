import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderCommandHandler } from '../../../../../src/application/commands/handlers/create-order.handler';
import { OrderService } from '../../../../../src/domain/services/order.service';
import { CreateOrderCommand } from '../../../../../src/application/commands/create-order.command';

describe('CreateOrderCommandHandler', () => {
  let handler: CreateOrderCommandHandler;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderCommandHandler,
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateOrderCommandHandler>(CreateOrderCommandHandler);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should call createOrder on OrderService with correct parameters', async () => {
    const command = new CreateOrderCommand('client-id', [
      { productId: 'product-1', quantity: 2, price: 100 },
    ]);

    await handler.execute(command);

    expect(orderService.createOrder).toHaveBeenCalledWith('client-id', [
      { productId: 'product-1', quantity: 2, price: 100 },
    ]);
  });
});