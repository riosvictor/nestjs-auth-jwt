import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { Roles } from '@/infra/decorators/roles.decorator';
import { Role } from '@/domain/entities';
import { UserCreateDto } from './dto';
import { CACHE_MANAGER, CacheKey } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export const USERS_CACHE_KEY = 'users';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _getAllUsersUseCase: GetAllUsersUseCase,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  public async create(@Body() user: UserCreateDto) {
    const newUser = await this._createUserUseCase.execute(user);
    await this._cacheManager.del(USERS_CACHE_KEY);
    return newUser;
  }

  @Get()
  @CacheKey(USERS_CACHE_KEY)
  public getAll() {
    return this._getAllUsersUseCase.execute();
  }
}
