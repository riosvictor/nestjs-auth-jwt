import { Injectable } from '@nestjs/common';
import { longRunningOperation } from '../common/utils/simulate-actions';
import { UserResponse } from './models/user-response.model';
import { UserEntity } from './models/user-entity.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private readonly _users: UserEntity[] = [
    {
      id: '4732e7f4-8588-4abc-888e-b57d23576331',
      name: 'john',
      email: 'john@example.com',
      // password: 'changeme',
      password: '$2a$10$0cC/fgy33ws6b.gCx2pFkOZ.j6oGDE/ezJKbMNzdlkEfIFSMsyk9e',
    },
    {
      id: '2699a569-b2bc-4058-b637-d5a23e3d6fe5',
      name: 'maria',
      email: 'maria@example.com',
      // password: 'guess',
      password: '$2a$10$3ukyN0MMzImN1FqDb2Bp2umlBuZ.M8qlVRzXN1tfOg02.Lr4Z01oe',
    },
  ];

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this._users.find((user) => user.email === email);
  }

  async getUsers(): Promise<UserEntity[]> {
    await longRunningOperation(2500);

    return plainToInstance(UserResponse, this._users);
  }
}
