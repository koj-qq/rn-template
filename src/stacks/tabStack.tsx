import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Iconfont } from '@/components';
import { Color, Size } from '@/config';

import Homepage from '@/screens/homepage';
import Mine from '@/screens/mine';

const Tab = createBottomTabNavigator();
export default function TabStack() {
  const tabItems = [
    {
      name: 'Homepage',
      component: Homepage,
      label: '首页',
      icon: 'icon_home_non',
      focusedIcon: 'icon_home_sel',
    },
    {
      name: 'Mine',
      component: Mine,
      label: '我的',
      icon: 'icon_me_non',
      focusedIcon: 'home_me_sel',
    },
  ];

  return (
    <Tab.Navigator initialRouteName="Homepage" lazy={true}>
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? Color.primary : Color.middleTextColor, fontSize: Size.px(10) }}>
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Iconfont name={item.focusedIcon} size={Size.px(24)} color={Color.primary} />
              ) : (
                <Iconfont name={item.icon} size={Size.px(24)} color={Color.middleTextColor} />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
