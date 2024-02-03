import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { UserRepository } from '@/domain/repositories';
import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';
import { userMock } from '@/test/mocks/users.mock';

describe('FindOneUserToAuthUseCase', () => {
  let useCase: FindOneUserToAuthUseCase;
  let repository: UserRepository;

  beforeEach(async () => {
    repository = new UsersInMemoryRepository();
    useCase = new FindOneUserToAuthUseCase(repository);
  });

  it('should be able to found a exists user', async () => {
    const createdUser = await repository.create(userMock);
    const userFounded = await useCase.execute(createdUser.email);

    expect(userFounded).toBeDefined();
    expect(userFounded.name).toBe(createdUser.name);
    expect(userFounded.email).toBe(createdUser.email);
  });
});
