import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { SWRConfig } from 'swr';
import { useUpdateAtom } from 'jotai/utils';
import { ThemeProvider, helpers } from '@td-design/react-native';

import Stack from './stacks';
import authService from 'modules/auth/authService';
import Iconfont from 'components/Iconfont';

enableScreens();
helpers.registerCustomIcon(Iconfont);

export default function App() {
  const updateAuth = useUpdateAtom(authService.authAtom);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
  }, []);

  /**
   * 全局的错误处理，当接口返回的是登录失败时自动登出进入登录页面重新登录
   * @param error
   */
  const handleError = (error: Error) => {
    if (error.message === 'LoginFailure') {
      updateAuth({ signedIn: false });
    }
  };

  return (
    <SafeAreaProvider>
      <SWRConfig
        value={{
          onError: handleError,
        }}>
        <ThemeProvider>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        </ThemeProvider>
      </SWRConfig>
    </SafeAreaProvider>
  );
}
