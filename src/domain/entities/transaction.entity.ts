export class Transaction {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly type: 'credit' | 'debit',
    public readonly createdAt: Date,
  ) {}
}