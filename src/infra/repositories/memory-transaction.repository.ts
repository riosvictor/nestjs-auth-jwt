import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../application/interfaces/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class MemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async getById(id: string): Promise<Transaction | null> {
    return this.transactions.find(tx => tx.id === id) || null;
  }

  async getAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}