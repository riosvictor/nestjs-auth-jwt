import { IQuery } from '@nestjs/cqrs';

export class GetOrderQuery implements IQuery {
  constructor(public readonly orderId: string) {}
}