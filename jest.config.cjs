// jest.config.cjs
const path = require('path');

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel-jest.config.cjs' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
