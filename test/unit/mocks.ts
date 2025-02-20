// Mock da Event Store
export const mockEventStore = {
  replay: jest.fn(),
};

// Mock do Repositório de Transações
export const mockTransactionRepository = {
  save: jest.fn(),
};