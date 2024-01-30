import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheModule,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_MODULE_CONFIG, JWT_MODULE_CONFIG } from '@/infra/config';
import { validate } from '@/infra/environment/env.validation';
import { AuthGuard } from '@/infra/guards';
import { ExecutionTimeMiddleware } from '@/infra/middleware/execution-time.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: JWT_MODULE_CONFIG,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: CACHE_MODULE_CONFIG,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class GlobalModule implements OnModuleDestroy, NestModule {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  async onModuleDestroy() {
    await this._cacheManager.reset();
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExecutionTimeMiddleware).forRoutes('*');
  }
}
