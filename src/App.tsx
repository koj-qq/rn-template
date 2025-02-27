import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import { SWRConfig } from 'swr';
import { useUpdateAtom } from 'jotai/utils';
import { ThemeProvider } from '@td-design/react-native';
import { useSafeState, useMount } from '@td-design/rn-hooks';

import { Stack } from './stacks';
import { authAtom } from 'atoms';
import { Fallback } from 'components';
import { lightTheme, darkTheme } from 'theme';
import { linking } from 'linking';

export function App() {
  const updateAuth = useUpdateAtom(authAtom);
  const [dark] = useSafeState(false);

  useMount(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
    });
  });

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
        }}
      >
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
          <NavigationContainer linking={linking} fallback={<Fallback />}>
            <Stack />
          </NavigationContainer>
        </ThemeProvider>
      </SWRConfig>
    </SafeAreaProvider>
  );
}
