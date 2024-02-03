import { UserRepository } from '@/domain/repositories';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { IHashService } from '@/adapters/interfaces';

export const createUserUseCase = (
  _userRepository: UserRepository,
  _hashService: IHashService,
) => {
  return new CreateUserUseCase(_userRepository, _hashService);
};

export const getAllUsersUseCase = (_userRepository: UserRepository) => {
  return new GetAllUsersUseCase(_userRepository);
};
