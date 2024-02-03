import { UserRepository } from '@/domain/repositories';
import { FindOneUserToAuthUseCase } from '@/application/usecases';

export const findOneUserToAuthUseCase = (_userRepository: UserRepository) => {
  return new FindOneUserToAuthUseCase(_userRepository);
};
