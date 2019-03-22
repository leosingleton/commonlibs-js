module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/math'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'build/',
      outputName: './results-node.xml',
    }]
  ],
  collectCoverage: true,
  coverageDirectory: 'build/coverage/node/'
};