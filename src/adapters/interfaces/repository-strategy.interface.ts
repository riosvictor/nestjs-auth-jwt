import { Provider } from '@nestjs/common';

export interface IRepositoryStrategy {
  getProvider(): Provider;
}
