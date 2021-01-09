import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { CardStyleInterpolators, StackHeaderLeftButtonProps, StackNavigationOptions } from '@react-navigation/stack';
import { Theme, useTheme, helpers, Icon } from '@td-design/react-native';
import { AuthService } from '@/modules/Auth/useAuthService';

import MainStack from './MainStack';
import SignInStack from './SignInStack';

const { px } = helpers;
export default () => {
  const authService = useContext(AuthService);
  const theme = useTheme<Theme>();

  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: {
      fontWeight: '500',
      color: theme.colors.primaryTextColor,
      fontSize: px(18),
    },
    headerTitleAlign: 'center',
    headerLeft: (props: StackHeaderLeftButtonProps) =>
      props.canGoBack && (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: px(10) }}>
          <Icon name="left" size={px(20)} color={theme.colors.primaryColor} />
        </TouchableOpacity>
      ),
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  if (authService.signedIn) return <MainStack {...screenOptions} />;
  return <SignInStack {...screenOptions} />;
};
