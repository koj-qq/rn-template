import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createSharedElementStackNavigator } from '@td-design/react-navigation-shared-element';

import { ListScreen, DetailScreen } from '../screens';
import { FastIOSTransitionSpec } from '../transitions';
import { defaultItem } from 'stacks/data';

const name = 'ListView';

const Stack = createSharedElementStackNavigator({
  name,
  debug: true,
});

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        // FastIOSTransitionSpec should be removed once this PR is merged:
        // https://github.com/react-navigation/react-navigation/pull/8028
        transitionSpec: {
          open: FastIOSTransitionSpec,
          close: FastIOSTransitionSpec,
        },
      }}
    >
      <Stack.Screen
        name={name}
        component={ListScreen}
        // options={{
        //   cardStyleInterpolator: ({ current }) => ({
        //     cardStyle: { opacity: current.progress },
        //   }),
        // }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: { opacity: current.progress },
          }),
        }}
        sharedElements={route => {
          const item = route.params.item || defaultItem;
          return [{ id: `${item.id}.image` }, { id: 'close', animation: 'fade-in' }];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
