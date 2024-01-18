import { Test, TestingModule } from '@nestjs/testing';
import { AuthPassportService } from './auth-passport.service';

describe('AuthPassportService', () => {
  let service: AuthPassportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthPassportService],
    }).compile();

    service = module.get<AuthPassportService>(AuthPassportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
