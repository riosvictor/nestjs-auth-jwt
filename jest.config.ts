import { Config } from 'jest';

const jestConfig: Config = {
  clearMocks: true,
  globals: {
    jest: true,
  },
  verbose: true,

  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ['../test/setup.ts'],
};

module.exports = jestConfig;
