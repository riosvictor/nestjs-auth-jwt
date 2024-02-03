import { DataSource } from 'typeorm';
import { UserEntity } from '@/domain/entities';
import { UserSchema } from '@/infra/db/typeorm/users';

export const userMock = UserEntity.create({
  id: crypto.randomUUID(),
  email: 'user@example.com',
  name: 'user',
  password: 'password',
});

export const getUserTypeORMRepository = async () => {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [UserSchema],
  });

  await dataSource.initialize();

  const repo = await dataSource.getRepository(UserEntity);
  return repo;
};
