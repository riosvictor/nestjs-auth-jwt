import { Config } from 'jest';

const jestConfig: Config = {
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
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  cacheDirectory: '/tmp/jest',
  testEnvironment: 'jest-environment-node',
  setupFiles: ['./test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
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
  coveragePathIgnorePatterns: ['/test/mocks'],
};

module.exports = jestConfig;
