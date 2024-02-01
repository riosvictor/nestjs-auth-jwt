import { Repository } from '@/adapters/interfaces';
import { UserEntity } from '@/domain/entities';

export abstract class UserRepository extends Repository<UserEntity, string> {}
