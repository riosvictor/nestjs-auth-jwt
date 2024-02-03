import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from '@/infra/guards';
import { AuthService } from '@/application/services';
import { BusinessException } from '@/domain/exceptions/bussiness.exception';
import { RefreshLoginDto, RequestLoginDto, ResponseLoginDto } from './dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: RequestLoginDto): Promise<ResponseLoginDto> {
    try {
      const auth = await this._authService.login(
        loginDto.email,
        loginDto.password,
      );
      return auth;
    } catch (error) {
      if (error instanceof BusinessException) {
        if (error.name === 'NOT_FOUND') {
          throw new UnauthorizedException();
        }
      }
    }
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
