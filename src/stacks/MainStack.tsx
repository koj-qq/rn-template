import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Homepage from '../screens/homepage';

const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      mode="card"
      headerMode="screen"
      // Stack下每个screen都会共享的配置
      screenOptions={{
        // headerTitleStyle: {
        //   fontWeight: '500',
        //   color: theme.colors.primaryTextColor,
        //   fontSize: px(18),
        // },
        headerTitleAlign: 'center',
        // headerLeft: (props: StackHeaderLeftButtonProps) =>
        //   props.canGoBack && (
        //     <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: px(10) }}>
        //       <Icon name="left" size={px(20)} color={theme.colors.primaryColor} />
        //     </TouchableOpacity>
        //   ),
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: 'Homepage' }} />
    </Stack.Navigator>
  );
};
