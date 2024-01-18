import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthPassportService } from './auth-passport.service';
import { AuthPassportJwtGuard, AuthPassportLocalGuard } from '../guards';

@Controller('auth-passport')
export class AuthPassportController {
  constructor(private readonly _authService: AuthPassportService) {}

  @UseGuards(AuthPassportLocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @UseGuards(AuthPassportJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
