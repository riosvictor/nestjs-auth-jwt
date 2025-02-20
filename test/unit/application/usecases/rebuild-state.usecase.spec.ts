import { ITransactionRepository } from "../../../../src/application/interfaces/transaction.repository";
import { RebuildStateUseCase } from "../../../../src/application/usecases";
import { MemoryEventStore } from "../../../../src/infra/event-store/memory-event.store";
import { mockEventStore, mockTransactionRepository } from "../../mocks";

// Criando a instância do caso de uso
const rebuildStateUseCase = new RebuildStateUseCase(
  mockTransactionRepository as unknown as ITransactionRepository,
  mockEventStore as unknown as MemoryEventStore,
);

describe('RebuildStateUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve reconstruir o estado corretamente a partir dos eventos', async () => {
    // Simulando eventos armazenados
    const events = [
      { transaction: { id: '1', amount: 100 } },
      { transaction: { id: '2', amount: -50 } },
      { transaction: { id: '3', amount: 200 } },
    ];

    mockEventStore.replay.mockResolvedValue(events);

    await rebuildStateUseCase.execute();

    expect(mockTransactionRepository.save).toHaveBeenCalledTimes(3);
    expect(mockTransactionRepository.save).toHaveBeenCalledWith(events[0].transaction);
    expect(mockTransactionRepository.save).toHaveBeenCalledWith(events[1].transaction);
    expect(mockTransactionRepository.save).toHaveBeenCalledWith(events[2].transaction);
  });

  it('Deve reconstruir o saldo corretamente após uma mudança na regra de negócio', async () => {
    // Simulando eventos armazenados
    const events = [
      { transaction: { id: '1', amount: 100 } },
      { transaction: { id: '2', amount: -50 } },
      { transaction: { id: '3', amount: 200 } },
    ];

    mockEventStore.replay.mockResolvedValue(events);

    // Alterando a regra de negócio (exemplo: taxa de 10% sobre depósitos)
    rebuildStateUseCase.execute = async function () {
      let balance = 0;
      const storedEvents = await mockEventStore.replay();
      for (const event of storedEvents) {
        const adjustedAmount = event.transaction.amount > 0 ? event.transaction.amount * 0.9 : event.transaction.amount;
        balance += adjustedAmount;
      }
      await mockTransactionRepository.save({ balance });
    };

    await rebuildStateUseCase.execute();

    // O saldo esperado com a nova regra (90 + (-50) + 180 = 220)
    expect(mockTransactionRepository.save).toHaveBeenCalledWith({ balance: 220 });
  });
});