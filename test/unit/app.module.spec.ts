import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
