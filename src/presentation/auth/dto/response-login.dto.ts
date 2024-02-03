import { Expose } from 'class-transformer';

export class ResponseLoginDto {
  @Expose() access_token: string;
  @Expose() refresh_token: string;
}
