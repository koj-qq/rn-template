import { LinkingOptions } from '@react-navigation/native';

const linking: LinkingOptions = {
  prefixes: ['https://rnTemplate/app/', 'rnTemplate://'],
  config: {
    screens: {
      Homepage: 'home',
      Mine: 'me',
      Settings: 'settings',
    },
  },
};

export default linking;
