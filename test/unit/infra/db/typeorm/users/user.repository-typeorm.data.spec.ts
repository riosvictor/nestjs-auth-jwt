import { Repository } from 'typeorm';
import { UserEntity } from '@/domain/entities';
import { UsersTypeOrmRepository } from '@/infra/db/typeorm/users';
import { getUserTypeORMRepository, userMock } from '@/test/mocks/users.mock';

describe('UsersTypeOrmRepository Test', () => {
  let repository: UsersTypeOrmRepository;
  let repositoryORM: Repository<UserEntity>;

  beforeEach(async () => {
    repositoryORM = await getUserTypeORMRepository();
    repository = new UsersTypeOrmRepository(repositoryORM);

    // await initialize database
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
