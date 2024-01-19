import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guards';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheModule,
} from '@nestjs/cache-manager';
import { CACHE_TTL } from './common/constants';
import { ExecutionTimeMiddleware } from './common/middleware/execution-time.middleware';
import { Cache } from 'cache-manager';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CacheModule.register({
      ttl: CACHE_TTL,
      isGlobal: true,
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
export class AppModule implements OnModuleDestroy, NestModule {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  async onModuleDestroy() {
    await this._cacheManager.reset();
  }

  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExecutionTimeMiddleware).forRoutes('*');
  }
}
