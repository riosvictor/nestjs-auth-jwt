import { plainToClass } from 'class-transformer';
import { UserCreatedDto } from '@/common/dtos';
import { Mapper } from '@/adapters/interfaces';
import { UserEntity } from '@/domain/entities';

export class UserCreatedMapper extends Mapper<UserCreatedDto, UserEntity> {
  mapFrom(data: UserCreatedDto): UserEntity {
    const user = new UserEntity();

    user.id = data.id;
    user.name = data.name;
    user.email = data.email;

    return user;
  }
  mapTo(data: UserEntity): UserCreatedDto {
    return plainToClass(UserCreatedDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
