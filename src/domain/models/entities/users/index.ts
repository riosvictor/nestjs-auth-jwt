import { Entity } from '@/domain/interfaces';

export class UserEntity extends Entity<string> {
  name: string;
  email: string;
  password: string;
}
