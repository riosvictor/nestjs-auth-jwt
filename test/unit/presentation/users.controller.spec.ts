import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@/presentation/users.controller';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { UserRepository } from '@/application/repositories';
import { UsersCacheMemoryRepository } from '@/adapters/data/cache-memory/users';

describe('UsersController', () => {
  let controller: UsersController;
  let getAllUseCase: GetAllUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CreateUserUseCase,
        GetAllUsersUseCase,
        {
          provide: UserRepository,
          useClass: UsersCacheMemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    getAllUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
  });

  it('should get users successfully', async () => {
    getAllUseCase.execute = jest.fn().mockResolvedValue([]);

    const result = await controller.getAll();

    expect(getAllUseCase.execute).toHaveBeenCalledWith();
    expect(result).toEqual([]);
  });
});
