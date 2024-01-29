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
import { JwtModule } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { validate } from './infra/environment/env.validation';
import { AuthGuard } from './infra/guards';
import { ExecutionTimeMiddleware } from './infra/middleware/execution-time.middleware';
import { UsersController } from './presentation/users.controller';
import {
  CreateUserUseCase,
  FindOneUserToAuthUseCase,
  GetAllUsersUseCase,
} from './use-cases';
import { CACHE_MODULE_CONFIG, JWT_MODULE_CONFIG } from './infra/config';
import { AuthController } from './presentation/auth.controller';
import { UserRepository } from './core/repositories/users';
import { UsersCacheMemoryRepository } from './data/cache-memory/users';
import { AuthService } from './infra/jwt/auth.service';

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
    {
      provide: UserRepository,
      useClass: UsersCacheMemoryRepository,
    },
    //
    CreateUserUseCase,
    GetAllUsersUseCase,
    FindOneUserToAuthUseCase,
    AuthService,
  ],
  controllers: [UsersController, AuthController],
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
