import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RefreshLoginDto {
  @IsJWT()
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
