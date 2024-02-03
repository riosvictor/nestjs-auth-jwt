import { CreateUserUseCase } from '@/application/usecases';
import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';
import { HashBcryptoService } from '@/application/services';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const repository = new UsersInMemoryRepository();
    const hashService = new HashBcryptoService();
    useCase = new CreateUserUseCase(repository, hashService);
  });

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
