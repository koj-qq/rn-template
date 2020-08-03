import React from 'react';
import { View } from 'react-native';
import { Size, Color } from './index';

export default {
  // 主色调的配置
  primaryStyle: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTitleStyle: {
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      color: Color.white,
      fontWeight: 'normal',
      fontSize: Size.px(18),
    },
    headerBackTitle: null,
    headerRight: <View />,
  },
};
