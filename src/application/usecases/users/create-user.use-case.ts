import { IUseCase } from '@/domain/interfaces';
import { UserRepository } from '@/domain/repositories';
import { UserEntity } from '@/domain/entities';
import { IHashService } from '@/adapters/interfaces';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

type CreateUserOutput = {
  id: string;
  name: string;
  email: string;
};

export class CreateUserUseCase implements IUseCase<CreateUserOutput> {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _hashService: IHashService,
  ) {}

  async execute(dto: CreateUserInput): Promise<CreateUserOutput> {
    const entity = UserEntity.create(dto);
    const encrypted = await this._encryptedUser(entity);
    const created = await this._userRepository.create(encrypted);

    return created.toJSON();
  }

  private async _encryptedUser(data: UserEntity): Promise<UserEntity> {
    const password = data.password;
    data.password = await this._hashService.encrypt(password);
    return data;
  }
}
