import { IRepository } from '@/domain/interfaces';
import { UserEntity } from '@/domain/entities';

export abstract class UserRepository extends IRepository<UserEntity, string> {}
