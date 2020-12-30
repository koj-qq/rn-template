import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';

import { MainStack } from './stacks/MainStack';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
