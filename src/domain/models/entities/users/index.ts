import { Entity } from '@/domain/interfaces';
import { Expose } from 'class-transformer';

export class UserEntity extends Entity<string> {
  @Expose() id?: string;
  @Expose() name: string;
  @Expose() email: string;
  @Expose() password: string;
}