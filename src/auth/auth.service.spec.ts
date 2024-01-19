import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from '../common/constants';
import { UsersService } from '../users/users.service';
import { encrypt } from '../common/utils/password-hash';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: jwt.secret,
          signOptions: jwt.options,
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should authenticate user with valid email and password', async () => {
    const password = 'chiclete';
    const hashPassword = await encrypt(password);
    const user = {
      id: crypto.randomUUID(),
      email: 'batata@example.com',
      password: hashPassword,
    };
    usersService.findOne = jest.fn().mockResolvedValueOnce(user);

    const response = await service.login(user.email, password);
    expect(response.access_token).toBeDefined();
    expect(response.access_token).toMatch(
      /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    );
  });

  it('should throw UnauthorizedException when invalid email and password combination is provided', async () => {
    usersService.findOne = jest.fn().mockResolvedValueOnce(undefined);

    await expect(
      service.login('john@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw error when empty email or password field is provided', async () => {
    usersService.findOne = jest.fn().mockResolvedValue(undefined);

    await expect(service.login('', 'password')).rejects.toThrow();
    await expect(service.login('email@example.com', '')).rejects.toThrow();
  });
});
