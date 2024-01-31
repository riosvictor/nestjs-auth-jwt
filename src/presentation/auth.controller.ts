import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@/infra/guards';
import { AuthService } from '@/application/services';
import {
  RefreshLoginDto,
  RequestLoginDto,
  ResponseLoginDto,
} from '@/common/dtos';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: RequestLoginDto): Promise<ResponseLoginDto> {
    return this._authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshDto: RefreshLoginDto): Promise<ResponseLoginDto> {
    return this._authService.validateRefresh(refreshDto.refresh_token);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
