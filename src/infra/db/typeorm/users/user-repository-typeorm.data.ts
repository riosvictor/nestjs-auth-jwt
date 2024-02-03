import { Injectable } from '@nestjs/common';
import { Role, UserEntity } from '@/domain/entities';
import { UserRepository } from '@/domain/repositories';
import { RepositoryTypeOrm } from '@/infra/db/typeorm/repository-typeorm.data';
import { Repository } from 'typeorm';

@Injectable()
export class UsersTypeOrmRepository
  extends RepositoryTypeOrm<UserEntity>
  implements UserRepository
{
  constructor(repositoryORM: Repository<UserEntity>) {
    super(repositoryORM);
    this.init();
  }

  async init() {
    const john = UserEntity.create({
      id: '4732e7f4-8588-4abc-888e-b57d23576331',
      name: 'john',
      email: 'john@example.com',
      password: '$2a$10$0cC/fgy33ws6b.gCx2pFkOZ.j6oGDE/ezJKbMNzdlkEfIFSMsyk9e',
      roles: [Role.ADMIN],
    });
    const mary = UserEntity.create({
      id: '2699a569-b2bc-4058-b637-d5a23e3d6fe5',
      name: 'maria',
      email: 'maria@example.com',
      password: '$2a$10$3ukyN0MMzImN1FqDb2Bp2umlBuZ.M8qlVRzXN1tfOg02.Lr4Z01oe',
      roles: [Role.USER],
    });

    await this.create(john);
    await this.create(mary);
  }
}
