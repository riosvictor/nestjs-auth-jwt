import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/application/services';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { GlobalModule } from '@/common/global/global.module';
import { encrypt } from '@/common/utils';
import { UserRepository } from '@/application/repositories';
import { UsersCacheMemoryRepository } from '@/adapters/data/cache-memory/users';

describe('AuthService', () => {
  let service: AuthService;
  let findUserUseCase: FindOneUserToAuthUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [
        AuthService,
        FindOneUserToAuthUseCase,
        {
          provide: UserRepository,
          useClass: UsersCacheMemoryRepository,
        },
      ],
      exports: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    findUserUseCase = module.get<FindOneUserToAuthUseCase>(
      FindOneUserToAuthUseCase,
    );
  });

  it('should authenticate user with valid email and password', async () => {
    const password = 'chiclete';
    const hashPassword = await encrypt(password);
    const user = {
      id: crypto.randomUUID(),
      email: 'batata@example.com',
      password: hashPassword,
    };
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce(user);

    const response = await service.login(user.email, password);
    expect(response.access_token).toBeDefined();
    expect(response.access_token).toMatch(
      /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    );
  });

  it('should throw UnauthorizedException when invalid email and password combination is provided', async () => {
    findUserUseCase.execute = jest.fn().mockResolvedValueOnce(undefined);

    await expect(
      service.login('john@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw error when empty email or password field is provided', async () => {
    findUserUseCase.execute = jest.fn().mockResolvedValue(undefined);

    await expect(service.login('', 'password')).rejects.toThrow();
    await expect(service.login('email@example.com', '')).rejects.toThrow();
  });
});
