import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserCreatedDto } from '@/common/dtos';
import { UseCase } from '@/adapters/interfaces';
import { UserRepository } from '@/application/repositories/users';
import {
  UserCreateMapper,
  UserCreatedMapper,
} from '@/domain/models/mappers/users';
import { encrypt } from '@/common/utils/password-hash';
import { UserEntity } from '@/domain/models/entities/users';

@Injectable()
export class CreateUserUseCase implements UseCase<UserCreatedDto> {
  private readonly _userCreateMapper: UserCreateMapper;
  private readonly _userCreatedMapper: UserCreatedMapper;

  constructor(private readonly _userRepository: UserRepository) {
    this._userCreateMapper = new UserCreateMapper();
    this._userCreatedMapper = new UserCreatedMapper();
  }

  async execute(dto: UserCreateDto): Promise<UserCreatedDto> {
    const entity = this._userCreateMapper.mapFrom(dto);
    const encrypted = await this._encryptedUser(entity);
    const created = await this._userRepository.create(encrypted);

    return this._userCreatedMapper.mapTo(created);
  }

  private async _encryptedUser(data: UserEntity): Promise<UserEntity> {
    const password = data.password;
    data.password = await encrypt(password);
    return data;
  }
}
