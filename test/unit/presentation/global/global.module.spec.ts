import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ExecutionTimeMiddleware } from '@/infra/middleware/execution-time.middleware';
import { GlobalModule } from '@/presentation/global/global.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

describe('GlobalModule', () => {
  let global: TestingModule;
  let configModule: ConfigModule;
  let jwtModule: JwtModule;
  let cacheManager: Cache;
  let cacheModule: CacheModule;
  let rateLimitModule: ThrottlerModule;

  beforeEach(async () => {
    global = await Test.createTestingModule({
      imports: [GlobalModule],
    }).compile();

    cacheManager = global.get<Cache>(CACHE_MANAGER);
    configModule = global.get<ConfigModule>(ConfigModule);
    jwtModule = global.get<JwtModule>(JwtModule);
    cacheModule = global.get<CacheModule>(CacheModule);
    rateLimitModule = global.get<ThrottlerModule>(ThrottlerModule);
  });

  afterAll(async () => {
    await global.close();
  });

  it('should be defined', () => {
    const globalModule = global.get<GlobalModule>(GlobalModule);

    expect(globalModule).toBeDefined();
    expect(cacheManager).toBeDefined();
    expect(configModule).toBeDefined();
    expect(jwtModule).toBeDefined();
    expect(cacheModule).toBeDefined();
    expect(rateLimitModule).toBeDefined();
  });

  it('should reset cache manager when onModuleDestroy is called', async () => {
    const resetSpy = jest.spyOn(cacheManager, 'clear');
    const globalModule = global.get<GlobalModule>(GlobalModule);

    await globalModule.onModuleDestroy();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should apply ExecutionTimeMiddleware to all routes', () => {
    const forRoutesMock = jest.fn();
    const consumerMock = {
      apply: jest.fn().mockImplementation(() => ({
        forRoutes: forRoutesMock,
      })),
    };

    const globalModule = global.get<GlobalModule>(GlobalModule);
    globalModule.configure(consumerMock);

    expect(consumerMock.apply).toHaveBeenCalledWith(ExecutionTimeMiddleware);
    expect(forRoutesMock).toHaveBeenCalledWith('*');
  });
});
