import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest to compile TypeScript
  testEnvironment: 'node', // Simulate a Node.js environment
  testMatch: ['<rootDir>/tests/**/*.test.ts'], // Match test files in the tests folder
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/tests'], // Set the root to the tests folder
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }], // Move ts-jest config here
  },
};

export default config;