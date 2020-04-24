// @leosingleton/commonlibs - Common Libraries for TypeScript and .NET Core
// Copyright (c) Leo C. Singleton IV <leo@leosingleton.com>
// See LICENSE in the project root for license information.

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/__tests__/**/*.(test|node).ts'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'build/',
      outputName: './results-node.xml',
    }]
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/__tests__/**',
    '!**/build/**'
  ],
  coverageDirectory: 'build/coverage/node/',
  coverageReporters: ['html', 'text', 'cobertura']
};
