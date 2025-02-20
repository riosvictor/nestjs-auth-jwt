import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { MemoryTransactionRepository } from './infra/repositories/memory-transaction.repository';
import { ITransactionRepository } from './application/interfaces/transaction.repository';
import { MemoryEventStore } from './infra/event-store/memory-event.store';
import * as glob from 'glob';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: MemoryTransactionRepository,
    },
    MemoryEventStore,
    ...AppModule.loadUseCases(),
  ],
})
export class AppModule {
  static loadUseCases(): any[] {
    const useCases = [];
    const files = glob.sync(path.resolve(__dirname, './application/usecases/**/*.usecase.{ts,js}'));
    const logger = new Logger('AppModule');

    for (const file of files) {
      const useCase = require(file);
      for (const key in useCase) {
        if (useCase.hasOwnProperty(key)) {
          useCases.push(useCase[key]);
        }
      }
    }

    logger.log(`\nUse cases loaded:\n${useCases.map(useCase => `\t> ${useCase.name}`).join('\n')}`);

    return useCases;
  }
}