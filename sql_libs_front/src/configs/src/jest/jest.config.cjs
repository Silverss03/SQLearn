const path = require('node:path');

module.exports = {
  globals: {
    IS_REACT_ACT_ENVIRONMENT: true,
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: [path.join(__dirname, './jest.setup.ts')],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '@swc/jest',
      {
        module: {
          type: 'commonjs',
        },
        sourceMaps: 'inline',
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },

          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.join(__dirname, './__mocks__/fileMock.cjs'),
    '\\.(css|scss)$': path.join(__dirname, './__mocks__/styleMock.cjs'),
  },
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es|@mp)/)'],
  coverageReporters: ['cobertura', 'text'],
};
