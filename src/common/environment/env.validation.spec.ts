// Generated by CodiumAI

import { CACHE_TTL_MINUTES, Environment, JWT } from '../constants';
import { validate } from './env.validation';

describe('validate', () => {
  it('should validate a valid configuration object without errors', () => {
    const config = {
      NODE_ENV: Environment.DEVELOPMENT,
      PORT: 3000,
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN_MINUTES: 60,
      CACHE_TTL_IN_MINUTES: 30,
    };

    expect(() => {
      validate(config);
    }).not.toThrow();
  });

  it('should validate a configuration object with only required properties without errors', () => {
    const config = {
      NODE_ENV: Environment.DEVELOPMENT,
      JWT_SECRET: 'secret',
    };

    expect(() => {
      validate(config);
    }).not.toThrow();
  });

  it('should validate a configuration object with all properties set to default values without errors', () => {
    const config = {
      NODE_ENV: Environment.DEVELOPMENT,
      PORT: 3000,
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN_MINUTES: JWT.OPTIONS.EXPIRES_IN_MINUTES,
      CACHE_TTL_IN_MINUTES: CACHE_TTL_MINUTES,
    };

    expect(() => {
      validate(config);
    }).not.toThrow();
  });

  it('should throw an error when validating a configuration object with missing required properties', () => {
    const config = {
      NODE_ENV: Environment.DEVELOPMENT,
      PORT: 3000,
    };

    expect(() => {
      validate(config);
    }).toThrow();
  });

  describe('should throw an error when validating a configuration object with invalid property types', () => {
    it('node env', () => {
      const config = {
        NODE_ENV: 'Invalid',
        PORT: 3000,
      };

      expect(() => {
        validate(config);
      }).toThrow();
    });

    it('port', () => {
      const config = {
        NODE_ENV: Environment.DEVELOPMENT,
        PORT: '3000',
      };

      expect(() => {
        validate(config);
      }).toThrow();
    });
  });
});
