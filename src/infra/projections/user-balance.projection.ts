import { TransactionCreatedEvent } from "../../domain/events/transaction-created.event";

export class UserBalanceProjection {
  private balances: Map<string, number> = new Map();

  process(event: TransactionCreatedEvent): void {
    const { transaction } = event;
    const currentBalance = this.balances.get(transaction.id) || 0;
    const newBalance = transaction.type === 'credit' 
      ? currentBalance + transaction.amount 
      : currentBalance - transaction.amount;
    
    this.balances.set(transaction.id, newBalance);
  }

  getBalance(userId: string): number {
    return this.balances.get(userId) || 0;
  }
}
