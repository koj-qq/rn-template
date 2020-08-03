navigator.geolocation = require('@react-native-community/geolocation');
import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useReducer } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from '@ant-design/react-native';
import zhCN from '@ant-design/react-native/es/locale-provider/zh_CN';
import SplashScreen from 'react-native-splash-screen';

import Loading from '@/screens/loading';
import '@/services';
import { AuthContext } from '@/context/AuthContext';
import { SignInStack } from '@/stacks/signInStack';
import { MainStack } from '@/stacks/mainStack';
import useJPush from '@/hooks/useJPush';
import { isSignedIn, signOut as loginOut } from '@/utils/auth';
import linking from './linking';
import theme from './theme';

type State = {
  loading: boolean;
  signedIn: boolean;
};

const App = () => {
  useJPush();

  const [state, dispatch] = useReducer(
    (prevState: State, action: { type: string; signedIn: boolean }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            loading: false,
            signedIn: action.signedIn,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            loading: false,
            signedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            loading: false,
            signedIn: false,
          };
        default:
          return {
            loading: true,
            signedIn: false,
          };
      }
    },
    {
      loading: true,
      signedIn: false,
    }
  );

  useEffect(() => {
    (async () => {
      const signedIn = await isSignedIn();
      dispatch({ type: 'RESTORE_TOKEN', signedIn });
      SplashScreen.hide();
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn() {
        dispatch({ type: 'SIGN_IN', signedIn: true });
      },
      async signOut() {
        await loginOut();
        dispatch({ type: 'SIGN_OUT', signedIn: false });
      },
    }),
    []
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Provider locale={zhCN} theme={theme}>
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer linking={linking} fallback={<Loading />}>
            {state.signedIn ? <MainStack /> : <SignInStack />}
          </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
