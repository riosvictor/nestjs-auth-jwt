import { Transaction } from "../../domain/entities/transaction.entity";

export abstract class ITransactionRepository {
  abstract save(transaction: Transaction): Promise<void>;
  abstract getById(id: string): Promise<Transaction | null>;
  abstract getAll(): Promise<Transaction[]>;
}