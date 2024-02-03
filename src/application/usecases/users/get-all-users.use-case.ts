import { Injectable } from '@nestjs/common';
import { IUseCase } from '@/domain/interfaces';
import { UserRepository } from '@/domain/repositories';

type GetAllUsersOutput = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class GetAllUsersUseCase implements IUseCase<GetAllUsersOutput[]> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersOutput[]> {
    const users = await this._userRepository.getAll();

    return users.map((user) => user.toJSON());
  }
}
