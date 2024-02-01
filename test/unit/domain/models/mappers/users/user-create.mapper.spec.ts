import { UserCreateDto } from '@/common/dtos';
import { UserCreateMapper } from '@/adapters/mappers/users';
import { UserEntity } from '@/domain/entities';

describe('UserCreateMapper', () => {
  it('should map a valid UserCreateDto to a UserEntity', () => {
    const mapper = new UserCreateMapper();
    const userCreateDto = new UserCreateDto();
    userCreateDto.name = 'John Doe';
    userCreateDto.email = 'johndoe@example.com';
    userCreateDto.password = 'password123';

    const userEntity = mapper.mapFrom(userCreateDto);

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.name).toBe(userCreateDto.name);
    expect(userEntity.email).toBe(userCreateDto.email);
    expect(userEntity.password).toBe(userCreateDto.password);
  });

  it('should map a UserEntity back to a valid UserCreateDto', () => {
    const mapper = new UserCreateMapper();
    const userEntity = new UserEntity();
    userEntity.name = 'John Doe';
    userEntity.email = 'johndoe@example.com';
    userEntity.password = 'password123';

    const userCreateDto = mapper.mapTo(userEntity);

    expect(userCreateDto).toBeInstanceOf(UserCreateDto);
    expect(userCreateDto.name).toBe(userEntity.name);
    expect(userCreateDto.email).toBe(userEntity.email);
    expect(userCreateDto.password).toBe(userEntity.password);
  });

  it('should handle optional id field in UserCreateDto', () => {
    const mapper = new UserCreateMapper();
    const userCreateDto = new UserCreateDto();

    userCreateDto.name = 'John Doe';
    userCreateDto.email = 'johndoe@example.com';
    userCreateDto.password = 'password123';

    const userEntity = mapper.mapFrom(userCreateDto);

    expect(userEntity).toBeInstanceOf(UserEntity);
    expect(userEntity.name).toBe(userCreateDto.name);
    expect(userEntity.email).toBe(userCreateDto.email);
    expect(userEntity.password).toBe(userCreateDto.password);
  });
});
