import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthPassportService } from '../auth-passport.service';
import { User } from '../../users/users.model';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwt } from '../../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthPassportService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    return { id: payload.sub, email: payload.email };
  }
}
