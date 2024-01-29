import { Repository } from '@/core/base';
import { UserEntity } from '@/core/domain/entities/users';

export abstract class UserRepository extends Repository<UserEntity, string> {}
