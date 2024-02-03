import { Repository } from 'typeorm';
import { UserEntity } from '@/domain/entities';
import { getUserTypeORMRepository, userMock } from '@/test/mocks/users.mock';

describe('typeorm user schema', () => {
  let repositoryORM: Repository<UserEntity>;

  beforeEach(async () => {
    repositoryORM = await getUserTypeORMRepository();
  });

  it('create', async () => {
    const created = await repositoryORM.save(userMock);

    expect(created.id).toBeDefined();
  });
});
