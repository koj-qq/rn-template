// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets');

const jestModules = ['react-native', '@td-design/react-native'].join('|');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
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
