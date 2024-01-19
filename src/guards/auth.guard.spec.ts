import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwt } from '../common/constants';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';

const getContext = (headers = {}) =>
  ({
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
    getHandler: () => {},
    getClass: () => {},
  }) as any;

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwt.secret,
          signOptions: jwt.options,
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

    const result = await guard.canActivate({
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
      getHandler: () => {},
      getClass: () => {},
    } as any);

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
