import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPassportGuard, LocalPassportGuard, Public } from '../guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // @UseGuards(LocalPassportGuard)
  @Public()
  @UseGuards(LocalPassportGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @UseGuards(JwtPassportGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
