import { Repository } from '@/adapters/interfaces';
import { UserEntity } from '@/domain/models/entities/users';

export abstract class UserRepository extends Repository<UserEntity, string> {}
