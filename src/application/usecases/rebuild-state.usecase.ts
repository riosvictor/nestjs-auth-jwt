import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/transaction.repository';
import { MemoryEventStore } from '../../infra/event-store/memory-event.store';

@Injectable()
export class RebuildStateUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly eventStore: MemoryEventStore,
  ) {}

  async execute(): Promise<void> {
    const events = await this.eventStore.replay();
    for (const event of events) {
      await this.transactionRepository.save(event.transaction);
    }
  }
}