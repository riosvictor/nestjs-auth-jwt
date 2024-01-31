import { Injectable } from '@nestjs/common';
import { RepositoryCacheMemory } from '@/adapters/data/cache-memory/repository-cache-memory.data';
import { UserEntity } from '@/domain/models/entities/users';
import { UserRepository } from '@/application/repositories';
import { Role } from '@/common/enums';

@Injectable()
export class UsersCacheMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UserRepository
{
  constructor() {
    super();

    this.items.push(
      ...[
        {
          id: '4732e7f4-8588-4abc-888e-b57d23576331',
          name: 'john',
          email: 'john@example.com',
          password:
            '$2a$10$0cC/fgy33ws6b.gCx2pFkOZ.j6oGDE/ezJKbMNzdlkEfIFSMsyk9e',
          roles: [Role.ADMIN],
        },
        {
          id: '2699a569-b2bc-4058-b637-d5a23e3d6fe5',
          name: 'maria',
          email: 'maria@example.com',
          password:
            '$2a$10$3ukyN0MMzImN1FqDb2Bp2umlBuZ.M8qlVRzXN1tfOg02.Lr4Z01oe',
          roles: [Role.USER],
        },
      ],
    );
  }
}
