import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheModule,
} from '@nestjs/cache-manager';
import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { AuthModule } from './auth/auth.module';
import { validate } from './common/environment/env.validation';
import { AuthGuard } from './common/guards';
import { ExecutionTimeMiddleware } from './common/middleware/execution-time.middleware';
import { UsersModule } from './users/users.module';
import { CACHE_MODULE_CONFIG } from './common/config/cache-module.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AuthModule,
    UsersModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: CACHE_MODULE_CONFIG,
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
