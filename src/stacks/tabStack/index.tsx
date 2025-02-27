import { useTheme } from '@shopify/restyle';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { helpers } from '@td-design/react-native';

import { AppTheme } from 'theme';
import { Text } from 'components';
import Icon, { IconNames } from '../../components/Icon';

import { Homepage } from 'modules/homepage/screens';
import { Mine } from 'modules/user/screens';

const { px } = helpers;
const Tab = createBottomTabNavigator();
const tabItems: { name: string; label: string; icon: IconNames; component: () => JSX.Element }[] = [
  {
    name: 'Homepage',
    component: Homepage,
    label: '首页',
    icon: 'sms',
  },
  {
    name: 'Mine',
    component: Mine,
    label: '我的',
    icon: 'user',
  },
];

export const TabStack = () => {
  const theme = useTheme<AppTheme>();
  return (
    <Tab.Navigator initialRouteName="Homepage" screenOptions={{ lazy: true }}>
      {tabItems.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.label,
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  color: focused ? theme.colors.gray500 : theme.colors.gray300,
                  fontSize: px(12),
                  marginBottom: theme.spacing.x1,
                }}
              >
                {item?.label}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon name={item.icon} size={px(20)} color={focused ? theme.colors.gray500 : theme.colors.gray300} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
