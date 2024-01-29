import { Injectable } from '@nestjs/common';
import { UserCreatedDto } from '@/common/dtos';
import { UseCase } from '@/core/base/use-case.interface';
import { UserRepository } from '@/core/repositories/users';
import { UserCreatedMapper } from '@/core/domain/mappers/users';

@Injectable()
export class GetAllUsersUseCase implements UseCase<UserCreatedDto[]> {
  private readonly _userCreatedMapper: UserCreatedMapper;

  constructor(private readonly _userRepository: UserRepository) {
    this._userCreatedMapper = new UserCreatedMapper();
  }

  async execute(): Promise<UserCreatedDto[]> {
    const users = await this._userRepository.getAll();

    return users.map((u) => this._userCreatedMapper.mapTo(u));
  }
}
