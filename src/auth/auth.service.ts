import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseLogin } from './models/response-login.model';
import { validate } from '../common/utils/password-hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<ResponseLogin> {
    const user = await this._usersService.findOne(email);

    const isValid = await validate(password, user?.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
