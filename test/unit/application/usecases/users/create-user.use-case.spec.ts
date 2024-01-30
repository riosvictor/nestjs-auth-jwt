import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@/application/usecases';
import { UserRepository } from '@/application/repositories';
import { UsersCacheMemoryRepository } from '@/adapters/data/cache-memory/users';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useClass: UsersCacheMemoryRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  // it('should be able to find a user by email when user exists', async () => {
  //   const user = await useCase.findOne('john@example.com');

  //   expect(user).toBeDefined();
  //   expect(user?.name).toBe('john');
  // });

  // it('should return undefined if user is not found when user does not exist', async () => {
  //   const user = await useCase.findOne('nonexistent@example.com');
  //   expect(user).toBeUndefined();
  // });

  // it('should be able to get all users ', async () => {
  //   const users = await useCase.getUsers();

  //   expect(users.length).toBe(2);
  // });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'john',
      email: 'john@email.com',
      password: 'password',
    };

    const created = await useCase.execute(user);
    expect(created).toBeDefined();
    expect(created.name).toBe(user.name);
    expect(created.email).toBe(user.email);
  });
});
