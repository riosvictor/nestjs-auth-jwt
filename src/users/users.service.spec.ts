import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be able to find a user by email when user exists', async () => {
    const user = await service.findOne('john@example.com');

    expect(user).toBeDefined();
    expect(user?.name).toBe('john');
  });

  it('should return undefined if user is not found when user does not exist', async () => {
    const user = await service.findOne('nonexistent@example.com');
    expect(user).toBeUndefined();
  });

  it('should be able to get all users ', async () => {
    const users = await service.getUsers();

    expect(users.length).toBe(2);
  });
});
