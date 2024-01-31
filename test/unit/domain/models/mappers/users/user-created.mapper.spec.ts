import { UserCreatedDto } from '@/common/dtos';
import { UserCreatedMapper } from '@/domain/models/mappers/users';
import { UserEntity } from '@/domain/models/entities/users';

describe('UserCreatedMapper', () => {
  it('should correctly map a UserCreatedDto to a UserEntity', () => {
    const mapper = new UserCreatedMapper();
    const userCreatedDto = new UserCreatedDto();
    userCreatedDto.id = '1';
    userCreatedDto.name = 'John Doe';
    userCreatedDto.email = 'john.doe@example.com';

    const userEntity = mapper.mapFrom(userCreatedDto);

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.id).toBe('1');
    expect(userEntity.name).toBe('John Doe');
    expect(userEntity.email).toBe('john.doe@example.com');
  });
});
