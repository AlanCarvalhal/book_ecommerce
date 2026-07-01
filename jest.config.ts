import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/config/database.ts',
    '!src/utils/seed.ts',
    '!src/dtos/**/*.ts',
    '!src/routes/**/*.ts',
    '!src/middlewares/**/*.ts',
  ],
};

export default config;
