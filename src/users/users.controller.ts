import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './models/user-response.model';
import { Public } from '../common/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Public()
  @Get()
  getUsers(): Promise<UserResponse[]> {
    return this._usersService.getUsers();
  }
}
