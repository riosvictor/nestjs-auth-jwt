import { Injectable } from '@nestjs/common';
import { TransactionCreatedEvent } from '../../domain/events/transaction-created.event';

@Injectable()
export class MemoryEventStore {
  private events: TransactionCreatedEvent[] = [];

  async append(event: TransactionCreatedEvent): Promise<void> {
    this.events.push(event);
  }

  async replay(): Promise<TransactionCreatedEvent[]> {
    return this.events;
  }
}
