import { IUseCase } from '@/domain/interfaces';
import { UserRepository } from '@/domain/repositories';
import { UserEntity } from '@/domain/entities';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';

export class FindOneUserToAuthUseCase implements IUseCase<UserEntity> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(email: string): Promise<UserEntity> {
    const user = await this._userRepository.getOne({ email });

    if (!user) {
      throw new BusinessException({
        name: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return user;
  }
}
