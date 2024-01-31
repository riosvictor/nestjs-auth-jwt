import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { validate } from '@/common/utils';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { ResponseLoginDto } from '@/common/dtos';
import { UserEntity } from '@/domain/models/entities/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly _findOneUserUseCase: FindOneUserToAuthUseCase,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<ResponseLoginDto> {
    const user = await this._findOneUserUseCase.execute(email);

    const isValid = await validate(password, user?.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this._generateToken(this._generatePayload(user));
  }

  async validateRefresh(token: string): Promise<ResponseLoginDto> {
    if (!token) {
      throw new NotFoundException('User not found');
    }

    const email = this._jwtService.decode(token)['email'];
    const user = await this._findOneUserUseCase.execute(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      this._jwtService.verify(token, {
        secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return this._generateToken(this._generatePayload(user));
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }

      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token invalid');
      }

      throw new UnauthorizedException(err?.name || 'Token invalid');
    }
  }

  private async _generateToken(payload: any): Promise<ResponseLoginDto> {
    const accessToken = this._jwtService.sign(payload);
    const refreshToken = this._jwtService.sign(payload, {
      secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${this._configService.get<number>(
        'JWT_REFRESH_EXPIRES_IN_MINUTES',
      )}m`,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private _generatePayload(user: UserEntity) {
    return { sub: user.id, email: user.email, roles: user.roles };
  }
}
