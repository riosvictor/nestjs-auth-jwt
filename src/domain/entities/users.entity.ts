import { Entity } from '@/domain/interfaces';
import { Role } from '@/common/enums';

export class UserEntity extends Entity<string> {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
