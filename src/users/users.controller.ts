import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './models/user-response.model';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UserResponse[]> {
    return this._usersService.getUsers();
  }
}
