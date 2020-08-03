import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { commonStackOptions } from '@/common';

import SignIn from '@/screens/signIn';

const Stack = createStackNavigator();
export const SignInStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={commonStackOptions}>
      <Stack.Screen name="SignIn" component={SignIn} options={{ header: () => null }} />
    </Stack.Navigator>
  );
};
