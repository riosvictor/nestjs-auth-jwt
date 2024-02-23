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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  CACHE_MODULE_CONFIG,
  JWT_MODULE_CONFIG,
  RATE_LIMIT_MODULE_CONFIG,
  WINSTON_MODULE_CONFIG,
} from '@/infra/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from '@/infra/environment/env.validation';
import { AuthGuard } from '@/infra/guards';
import { ExecutionTimeMiddleware } from '@/infra/middleware/execution-time.middleware';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { UserSchema } from '@/infra/db/typeorm/users';
import { WinstonModule } from 'nest-winston';

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
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: RATE_LIMIT_MODULE_CONFIG,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', '..', '..', 'database.sqlite'),
      synchronize: true,
      logging: false,
      entities: [UserSchema],
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: WINSTON_MODULE_CONFIG,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
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
