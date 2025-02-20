import { Injectable } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { IOrderRepository } from '../../application/interfaces/order.repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderDynamoDBRepository implements IOrderRepository {
  private readonly tableName = 'orders';
  private readonly client: DynamoDBClient;

  constructor(private configService: ConfigService) {
    this.client = new DynamoDBClient({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      endpoint: this.configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', 'test'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', 'test'),
      }
    });
  }

  async insert(pedido: Order): Promise<void> {
    const total = pedido.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const params = {
      TableName: this.tableName,
      Item: marshall({
        ...pedido,
        total,
      })
    };
    await this.client.send(new PutItemCommand(params));
  }

  async getById(pedidoId: string): Promise<Order> {
    const params = {
      TableName: this.tableName,
      Key: marshall({ id: pedidoId })
    };
    const result = await this.client.send(new GetItemCommand(params));
    return result.Item ? (unmarshall(result.Item) as Order) : undefined;
  }
}
