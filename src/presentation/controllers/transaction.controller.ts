import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateTransactionUseCase } from '../../application/usecases/create-transaction.usecase';
import { GetBalanceUseCase } from '../../application/usecases/get-balance.usecase';
import { RebuildStateUseCase } from '../../application/usecases/rebuild-state.usecase';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getBalanceUseCase: GetBalanceUseCase,
    private readonly rebuildStateUseCase: RebuildStateUseCase,
  ) {}

  @Post()
  async create(@Body() body: { id: string; amount: number; type: 'credit' | 'debit' }) {
    await this.createTransactionUseCase.execute(body.id, body.amount, body.type);
    return { message: 'Transaction created successfully' };
  }

  @Get('balance')
  async getBalance() {
    const balance = await this.getBalanceUseCase.execute();
    return { balance };
  }

  @Post('rebuild')
  async rebuildState() {
    await this.rebuildStateUseCase.execute();
    return { message: 'State rebuilt successfully' };
  }
}