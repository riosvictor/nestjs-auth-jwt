import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthPassportLocalGuard extends AuthGuard('local') {}
