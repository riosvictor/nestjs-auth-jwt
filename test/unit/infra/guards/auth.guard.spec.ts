import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@/infra/guards';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_MODULE_CONFIG } from '@/infra/config/jwt-module.config';

const getContext = (headers = {}) =>
  ({
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
    getHandler: () => {},
    getClass: () => {},
  }) as ExecutionContext;

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: JWT_MODULE_CONFIG,
          inject: [ConfigService],
        }),
      ],
      providers: [AuthGuard],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    reflector = module.get<Reflector>(Reflector);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access to public routes', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const context = getContext();

    const result = await guard.canActivate(context);

    expect(result).toBeTruthy();
  });

  it('should throw UnauthorizedException when no token is provided', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

    const context = getContext();

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should be success when token is provided', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    jwtService.verifyAsync = jest.fn().mockResolvedValue({});

    const context = getContext({
      authorization: 'Bearer batata',
    });

    const result = await guard.canActivate(context);

    expect(result).toBeTruthy();
  });

  it('should throw UnauthorizedException when token is invalid', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    jwtService.verifyAsync = jest.fn().mockRejectedValue({});

    const context = getContext({
      authorization: 'Bearer batata',
    });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when token is not type Bearer', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    jwtService.verifyAsync = jest.fn().mockRejectedValue({});
    const context = getContext({
      authorization: 'batata',
    });

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
