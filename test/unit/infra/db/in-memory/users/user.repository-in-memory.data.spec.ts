import { UsersInMemoryRepository } from '@/infra/db/in-memory/users';
import { userMock } from '@mocks/users.mock';

describe('UsersInMemoryRepository Test', () => {
  let repository: UsersInMemoryRepository;

  beforeEach(async () => {
    repository = new UsersInMemoryRepository();

    const items = await repository.getAll();
    items.forEach(async (item) => {
      await repository.delete(item.id);
    });
  });

  it('should insert a new user', async () => {
    await repository.create(userMock);

    const items = await repository.getAll();

    expect(items).toHaveLength(1);
    expect(items).toStrictEqual([userMock]);
  });
});
