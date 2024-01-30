import { Repository } from '@/domain/interfaces';
import { UserEntity } from '@/domain/models/entities/users';

export abstract class UserRepository extends Repository<UserEntity, string> {}
