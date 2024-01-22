import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionTimeMiddleware } from './common/middleware/execution-time.middleware';

describe('AppModule', () => {
  let appModule: TestingModule;
  let cacheManager: Cache;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    cacheManager = appModule.get<Cache>(CACHE_MANAGER);
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    const module = appModule.get<AppModule>(AppModule);

    expect(module).toBeDefined();
    expect(cacheManager).toBeDefined();
  });

  it('should reset cache manager when onModuleDestroy is called', async () => {
    const resetSpy = jest.spyOn(cacheManager, 'reset');
    const module = appModule.get<AppModule>(AppModule);

    await module.onModuleDestroy();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should apply ExecutionTimeMiddleware to all routes', () => {
    const forRoutesMock = jest.fn();
    const consumerMock = {
      apply: jest.fn().mockImplementation(() => ({
        forRoutes: forRoutesMock,
      })),
    };

    const module = appModule.get<AppModule>(AppModule);
    module.configure(consumerMock);

    expect(consumerMock.apply).toHaveBeenCalledWith(ExecutionTimeMiddleware);
    expect(forRoutesMock).toHaveBeenCalledWith('*');
  });
});
