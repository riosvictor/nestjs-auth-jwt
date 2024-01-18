import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthPassportService } from '../auth-passport.service';
import { User } from '../../users/users.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthPassportService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user = await this._authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
