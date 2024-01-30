import { Config } from 'jest';

const jestConfig: Config = {
  preset: 'ts-jest',
  bail: true,
  clearMocks: true,
  globals: {
    jest: true,
  },
  verbose: true,

  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', '/dist', '/build'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  cacheDirectory: '/tmp/jest',
  testEnvironment: 'jest-environment-node',
  setupFiles: ['./test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/dist',
    '/build',
    '<rootDir>/dist/',
  ],
};

module.exports = jestConfig;
