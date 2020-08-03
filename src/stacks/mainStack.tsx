import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { commonStackOptions } from '../common';

import TabStack from './tabStack';
import JPushDemo from '@/screens/jpushDemo';

const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      mode="card"
      // Stack下每个screen都会共享的配置
      screenOptions={commonStackOptions}
      headerMode="screen"
    >
      <Stack.Screen name="Tab" component={TabStack} options={{ header: () => null }} />
      <Stack.Screen name="JPushDemo" component={JPushDemo} options={{ headerTitle: '极光推送测试' }} />
    </Stack.Navigator>
  );
};
