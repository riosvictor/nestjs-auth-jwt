import { EntitySchema } from 'typeorm';
import { UserEntity } from '@/domain/entities';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'user',
  target: UserEntity,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },

    name: {
      type: String,
      length: 255,
    },

    email: {
      type: String,
      length: 255,
    },

    password: {
      type: String,
      length: 255,
    },

    roles: {
      type: 'simple-json',
    },
  },
});
