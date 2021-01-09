import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import SignIn from '@/modules/Auth/SignIn';

const Stack = createStackNavigator();
const SignInStack = (screenOptions: StackNavigationOptions) => {
  return (
    <Stack.Navigator initialRouteName="SignIn" mode="card" headerMode="screen" screenOptions={screenOptions}>
      <Stack.Screen name="SignIn" component={SignIn} options={{ header: () => null }} />
    </Stack.Navigator>
  );
};

export default SignInStack;
