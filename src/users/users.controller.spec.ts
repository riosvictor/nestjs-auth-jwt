import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should get users successfully', async () => {
    usersService.getUsers = jest.fn().mockResolvedValue([]);

    const result = await controller.getUsers();

    expect(usersService.getUsers).toHaveBeenCalledWith();
    expect(result).toEqual([]);
  });
});
