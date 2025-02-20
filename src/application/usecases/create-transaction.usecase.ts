import { Injectable } from '@nestjs/common';
import { TransactionCreatedEvent } from '../../domain/events/transaction-created.event';
import { ITransactionRepository } from '../interfaces/transaction.repository';
import { MemoryEventStore } from '../../infra/event-store/memory-event.store';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly eventStore: MemoryEventStore,
  ) {}

  async execute(id: string, amount: number, type: 'credit' | 'debit'): Promise<void> {
    const transaction = new Transaction(id, amount, type, new Date());
    await this.transactionRepository.save(transaction);
    await this.eventStore.append(new TransactionCreatedEvent(transaction));
  }
}