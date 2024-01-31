import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase, GetAllUsersUseCase } from '@/application/usecases';
import { UserCreateDto } from '@/common/dtos';
import { Roles } from '@/infra/decorators/roles.decorator';
import { Role } from '@/common/enums';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  public create(@Body() user: UserCreateDto) {
    return this._createUserUseCase.execute(user);
  }

  @Get()
  public getAll() {
    return this._getAllUsersUseCase.execute();
  }
}
