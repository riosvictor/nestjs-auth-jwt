import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient, PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { OrderDynamoDBRepository } from '../../../../src/infra/repositories/order-dynamodb.repository';
import { Order } from '../../../../src/domain/entities/order.entity';

jest.mock('@aws-sdk/client-dynamodb');

describe('OrderDynamoDBRepository', () => {
  let repository: OrderDynamoDBRepository;
  let client: DynamoDBClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDynamoDBRepository,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                AWS_REGION: 'us-east-1',
                DYNAMODB_ENDPOINT: 'http://localhost:8000',
                AWS_ACCESS_KEY_ID: 'test',
                AWS_SECRET_ACCESS_KEY: 'test',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    repository = module.get<OrderDynamoDBRepository>(OrderDynamoDBRepository);
    client = new DynamoDBClient({});
  });

  it('should insert an order into DynamoDB', async () => {
    const order = new Order('1', 'customer-1');
    jest.spyOn(client, 'send').mockResolvedValueOnce({} as never);

    await repository.insert(order);

    expect(client.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
  });

  it('should retrieve an order by ID from DynamoDB', async () => {
    const order = new Order('1', 'customer-1');
    
    jest.spyOn(client, 'send').mockResolvedValueOnce({
      Item: marshall(order, { convertClassInstanceToMap: true }),
    } as never);

    const result = await repository.getById('1');

    expect(client.send).toHaveBeenCalledWith(expect.any(GetItemCommand));
    expect(result).toMatchObject(expect.objectContaining({
      ...order,
      createdAt: expect.anything(),
    }));
  });

  it('should return undefined if order ID does not exist', async () => {
    jest.spyOn(client, 'send').mockResolvedValueOnce({ Item: undefined } as never);

    const result = await repository.getById('non-existent-id');

    expect(result).toBeUndefined();
  });
});