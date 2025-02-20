import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderQueryHandler } from '../../../../../src/application/queries/handlers/get-order.handler';
import { OrderService } from '../../../../../src/domain/services/order.service';
import { GetOrderQuery } from '../../../../../src/application/queries/get-order.query';
import { NotFoundException } from '@nestjs/common';
import { Order } from '../../../../../src/domain/entities/order.entity';

describe('GetOrderQueryHandler', () => {
  let handler: GetOrderQueryHandler;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrderQueryHandler,
        {
          provide: OrderService,
          useValue: {
            getOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<GetOrderQueryHandler>(GetOrderQueryHandler);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should return the order if found', async () => {
    const order = new Order('order-id', 'client-id');
    jest.spyOn(orderService, 'getOrder').mockResolvedValue(order);

    const query = new GetOrderQuery('order-id');
    const result = await handler.execute(query);

    expect(result).toEqual(order);
    expect(orderService.getOrder).toHaveBeenCalledWith('order-id');
  });

  it('should throw NotFoundException if order not found', async () => {
    jest.spyOn(orderService, 'getOrder').mockResolvedValue(null);

    const query = new GetOrderQuery('order-id');

    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
    expect(orderService.getOrder).toHaveBeenCalledWith('order-id');
  });
});