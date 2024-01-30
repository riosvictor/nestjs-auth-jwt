import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validate } from '@/common/utils/password-hash';
import { FindOneUserToAuthUseCase } from '@/application/usecases';
import { ResponseLoginDto } from '@/common/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly _findOneUserUseCase: FindOneUserToAuthUseCase,
    private readonly _jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<ResponseLoginDto> {
    const user = await this._findOneUserUseCase.execute(email);

    const isValid = await validate(password, user?.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this._jwtService.sign(payload),
    };
  }
}
