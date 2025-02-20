import { Transaction } from "../entities/transaction.entity";

export class TransactionCreatedEvent {
  constructor(
    public readonly transaction: Transaction
  ) {}
}