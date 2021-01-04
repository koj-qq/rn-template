const jestModules = ['react-native', '@td-design/react-native'].join('|');

module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
    '\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!(${jestModules})/)`],
  moduleNameMapper: {
    'test-utils': '<rootDir>/jest/test-utils.js',
    '@td-design/react-native': '<rootDir>/node_modules/@td-design/react-native/src/index.ts',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  cacheDirectory: '.jest/cache',
};
