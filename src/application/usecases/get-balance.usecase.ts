import { Injectable } from '@nestjs/common';
import { MemoryEventStore } from '../../infra/event-store/memory-event.store';

@Injectable()
export class GetBalanceUseCase {
  constructor(private readonly eventStore: MemoryEventStore) {}

  async execute(): Promise<number> {
    const events = await this.eventStore.replay();
    return events.reduce((balance, event) => {
      return event.transaction.type === 'credit'
        ? balance + event.transaction.amount
        : balance - event.transaction.amount;
    }, 0);
  }
}