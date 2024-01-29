import { plainToClass } from 'class-transformer';
import { UserCreatedDto } from '@/common/dtos';
import { Mapper } from '@/core/base';
import { UserEntity } from '@/core/domain/entities/users';

export class UserCreatedMapper extends Mapper<UserCreatedDto, UserEntity> {
  mapFrom(data: UserCreatedDto): UserEntity {
    return plainToClass(UserEntity, data, {
      excludeExtraneousValues: true,
      // exposeUnsetFields: false,
    });
  }
  mapTo(data: UserEntity): UserCreatedDto {
    return plainToClass(UserCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
