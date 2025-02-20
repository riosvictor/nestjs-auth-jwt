import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderService } from '../../../../src/domain/services/order.service';
import { IOrderRepository } from '../../../../src/application/interfaces/order.repository.interface';
import { Order, OrderItem } from '../../../../src/domain/entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: IOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderRepository',
          useValue: {
            insert: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<IOrderRepository>('OrderRepository');
  });

  describe('createOrder', () => {
    it('should throw BadRequestException if orderItems is empty', async () => {
      await expect(service.createOrder('customer-id', [])).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if orderItems is invalid', async () => {
      const invalidItems: OrderItem[] = [{ productId: '', quantity: 0, price: 0 }];
      await expect(service.createOrder('customer-id', invalidItems)).rejects.toThrow(BadRequestException);
    });

    it('should create and return a new order', async () => {
      const validItems: OrderItem[] = [{ productId: 'product-1', quantity: 2, price: 100 }];
      const newOrder = new Order('order-id', 'customer-id', validItems);
      
      const result = await service.createOrder('customer-id', validItems);

      expect(result).toMatchObject({
        ...newOrder,
        id: expect.any(String),
        createdAt: expect.any(Date),
      });
      expect(orderRepository.insert).toHaveBeenCalledWith(expect.objectContaining({
        customerId: 'customer-id',
        totalPrice: 200,
        items: validItems,
      }));
    });
  });

  describe('getOrder', () => {
    it('should return the order if found', async () => {
      const order = new Order('order-id', 'customer-id', []);
      jest.spyOn(orderRepository, 'getById').mockResolvedValue(order);

      const result = await service.getOrder('order-id');

      expect(result).toEqual(order);
      expect(orderRepository.getById).toHaveBeenCalledWith('order-id');
    });

    it('should return null if order not found', async () => {
      jest.spyOn(orderRepository, 'getById').mockResolvedValue(null);

      const result = await service.getOrder('order-id');

      expect(result).toBeNull();
      expect(orderRepository.getById).toHaveBeenCalledWith('order-id');
    });
  });
});