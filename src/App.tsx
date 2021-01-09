import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';

import useAuthService, { AuthService } from './modules/Auth/useAuthService';
import Stack from './stacks';

const App = () => {
  const authService = useAuthService();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthService.Provider value={authService}>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        </AuthService.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
