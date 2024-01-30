import { Injectable } from '@nestjs/common';
import { UseCase } from '@/adapters/interfaces';
import { UserRepository } from '@/application/repositories/users';
import { UserEntity } from '@/domain/models/entities/users';

@Injectable()
export class FindOneUserToAuthUseCase implements UseCase<UserEntity> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(email: string): Promise<UserEntity> {
    const user = await this._userRepository.getOne({ email });

    return user;
  }
}
