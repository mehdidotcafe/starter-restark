import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  setupFilesAfterEnv: ['<rootDir>/jest.setupafterenv.ts'],
  testEnvironment: 'jsdom',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  } 
}

export default jestConfig
