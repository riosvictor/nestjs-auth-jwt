import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrderController } from '../../../../src/presentation/controllers/order.controller';
import { CreateOrderCommand } from '../../../../src/application/commands/create-order.command';
import { GetOrderQuery } from '../../../../src/application/queries/get-order.query';
import { OrderItem } from '../../../../src/domain/entities/order.entity';

describe('OrderController', () => {
  let controller: OrderController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('criar', () => {
    it('should execute CreateOrderCommand with correct parameters', async () => {
      const body = { customerId: 'customer-id', items: [{ productId: 'product-1', quantity: 2, price: 100 }] as OrderItem[] };
      const command = new CreateOrderCommand(body.customerId, body.items);

      await controller.criar(body);

      expect(commandBus.execute).toHaveBeenCalledWith(command);
    });
  });

  describe('obter', () => {
    it('should execute GetOrderQuery with correct parameters', async () => {
      const id = 'order-id';
      const query = new GetOrderQuery(id);

      await controller.obter(id);

      expect(queryBus.execute).toHaveBeenCalledWith(query);
    });
  });
});