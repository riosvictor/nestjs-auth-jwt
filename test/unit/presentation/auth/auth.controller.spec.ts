import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '@/presentation/auth/auth.controller';
import { GlobalModule } from '@/presentation/global/global.module';
import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';
import { IHashService } from '@/adapters/interfaces';
import { AuthService, HashBcryptoService } from '@/application/services';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { UserRepository } from '@/domain/repositories';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalModule],
      providers: [
        AuthService,
        JwtService,
        FindOneUserToAuthUseCase,
        {
          provide: IHashService,
          useClass: HashBcryptoService,
        },
        {
          provide: UserRepository,
          useClass: UsersInMemoryRepository,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should handle login request with valid credentials', async () => {
    authService.login = jest.fn().mockResolvedValue({ access_token: 'token' });

    const loginDto = { email: 'test@example.com', password: 'password' };

    const result = await controller.login(loginDto);

    expect(authService.login).toHaveBeenCalledWith(
      loginDto.email,
      loginDto.password,
    );
    expect(result).toEqual({ access_token: 'token' });
  });

  it('should handle profile request with a valid token', async () => {
    const req = { user: { id: 1, email: 'test@example.com' } };

    const result = await controller.getProfile(req);

    expect(result).toEqual(req.user);
  });

  it('should return 401 status code for login requests with invalid credentials', async () => {
    authService.login = jest.fn().mockRejectedValue(
      new BusinessException({
        name: 'NOT_FOUND',
        message: 'User not found',
      }),
    );

    const loginDto = { email: 'test@example.com', password: 'password' };

    await expect(controller.login(loginDto)).rejects.toThrow('Unauthorized');
  });
});
