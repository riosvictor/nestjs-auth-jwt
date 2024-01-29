import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../common/environment/env.validation';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validate,
        }),
        AuthModule,
      ],
    }).compile();
  });

  afterAll(async () => {
    await appModule.close();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
