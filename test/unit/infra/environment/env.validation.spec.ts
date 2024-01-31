import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { validate } from '@/infra/environment/env.validation';
import { CACHE_TTL_IN_MINUTES, JWT } from '@/common/constants';
import { Environment } from '@/common/enums';

const initializeModule = () => {
  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        validate: validate,
        ignoreEnvFile: true,
      }),
    ],
  }).compile();
};

describe('validate ConfigModule', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    dotenv.config({ path: '.env.test' });
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('NODE_ENV variable', () => {
    it('should throw an error when required are missing', async () => {
      delete process.env.NODE_ENV;

      await expect(async () => await initializeModule()).rejects.toThrow();
    });

    it('should throw an error when value is invalid', async () => {
      process.env.NODE_ENV = 'Invalid';

      await expect(async () => await initializeModule()).rejects.toThrow();
    });

    it('should run successfully when value is valid', async () => {
      process.env.NODE_ENV = Environment.PRODUCTION;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('NODE_ENV')).toBe(Environment.PRODUCTION);
    });
  });

  describe('PORT variable', () => {
    it('should start successfully when variable are missing, with default value', async () => {
      delete process.env.PORT;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('PORT')).toBe(3000);
    });

    it('should start successfully when value is valid', async () => {
      const port = '3001';
      process.env.PORT = port;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('PORT')).toBe(Number(port));
    });

    it('should throw an error when value is invalid', async () => {
      process.env.PORT = 'Invalid';

      await expect(async () => await initializeModule()).rejects.toThrow();
    });
  });

  describe('JWT_SECRET variable', () => {
    it('should throw an error when required are missing', async () => {
      delete process.env.JWT_SECRET;

      await expect(async () => await initializeModule()).rejects.toThrow();
    });

    it('should run successfully when value is valid', async () => {
      const secret = 'any_secret';
      process.env.JWT_SECRET = secret;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('JWT_SECRET')).toBe(secret);
    });
  });

  describe('JWT_EXPIRES_IN_MINUTES variable', () => {
    it('should start successfully when variable are missing, with default value', async () => {
      delete process.env.JWT_EXPIRES_IN_MINUTES;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('JWT_EXPIRES_IN_MINUTES')).toBe(
        JWT.OPTIONS.EXPIRES_IN_MINUTES,
      );
    });

    it('should run successfully when value is valid', async () => {
      const minutes = '7';
      process.env.JWT_EXPIRES_IN_MINUTES = minutes;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('JWT_EXPIRES_IN_MINUTES')).toBe(Number(minutes));
    });

    it('should throw an error when value type is invalid', async () => {
      process.env.JWT_EXPIRES_IN_MINUTES = 'Invalid';

      await expect(async () => await initializeModule()).rejects.toThrow();
    });

    it('should throw an error when value is invalid', async () => {
      process.env.JWT_EXPIRES_IN_MINUTES = '0';

      await expect(async () => await initializeModule()).rejects.toThrow();
    });
  });

  describe('CACHE_TTL_IN_MINUTES variable', () => {
    it('should start successfully when variable are missing, with default value', async () => {
      delete process.env.CACHE_TTL_IN_MINUTES;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('CACHE_TTL_IN_MINUTES')).toBe(CACHE_TTL_IN_MINUTES);
    });

    it('should run successfully when value is valid', async () => {
      const minutes = '7';
      process.env.CACHE_TTL_IN_MINUTES = minutes;

      const module = await initializeModule();
      const service = module.get<ConfigService>(ConfigService);

      expect(service.get('CACHE_TTL_IN_MINUTES')).toBe(Number(minutes));
    });

    it('should throw an error when value type is invalid', async () => {
      process.env.CACHE_TTL_IN_MINUTES = 'Invalid';

      await expect(async () => await initializeModule()).rejects.toThrow();
    });

    it('should throw an error when value is invalid', async () => {
      console.log(process.env.CACHE_TTL_IN_MINUTES);

      process.env.CACHE_TTL_IN_MINUTES = '0';

      console.log(process.env.CACHE_TTL_IN_MINUTES);

      await expect(async () => await initializeModule()).rejects.toThrow();
    });
  });

  it('should load successfully when all environment variables are valid', async () => {
    process.env.NODE_ENV = Environment.DEVELOPMENT;
    process.env.PORT = '3000';
    process.env.JWT_SECRET = 'secret';
    process.env.JWT_EXPIRES_IN_MINUTES = '30';
    process.env.CACHE_TTL_IN_MINUTES = '30';

    const config = await initializeModule();

    expect(config).toBeDefined();
  });
});
