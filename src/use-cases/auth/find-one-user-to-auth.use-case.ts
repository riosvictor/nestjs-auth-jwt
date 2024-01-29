import { Injectable } from '@nestjs/common';
import { UseCase } from '@/core/base/use-case.interface';
import { UserRepository } from '@/core/repositories/users';
import { UserEntity } from '../../core/domain/entities/users';

@Injectable()
export class FindOneUserToAuthUseCase implements UseCase<UserEntity> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(email: string): Promise<UserEntity> {
    const user = await this._userRepository.getOne({ email });

    return user;
  }
}
