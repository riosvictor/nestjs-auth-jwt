import { plainToClass } from 'class-transformer';
import { UserCreateDto } from '@/common/dtos';
import { Mapper } from '@/core/base';
import { UserEntity } from '@/core/domain/entities/users';

export class UserCreateMapper extends Mapper<UserCreateDto, UserEntity> {
  mapFrom(data: UserCreateDto): UserEntity {
    return plainToClass(UserEntity, data);
  }
  mapTo(data: UserEntity): UserCreateDto {
    return plainToClass(UserCreateDto, data);
  }
}
