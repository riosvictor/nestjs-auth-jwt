import { Config } from 'jest';
import * as generalConfig from '../../jest.config';

const jestConfig: Config = {
  ...generalConfig,
  testRegex: '.e2e-spec.ts$',
  rootDir: '../../',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = jestConfig;
