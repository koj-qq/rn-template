import React, { FC } from 'react';
import { View, Dimensions, ViewStyle, StyleProp } from 'react-native';
import { Size } from '@/config';
import { isIOS } from '@/config/size';

export interface ShadowCardProps {
  backgroundColor?: string;
  elevation?: number;
  cornerRadius?: number;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
}

const Card: FC<ShadowCardProps> = props => {
  const { children, elevation, opacity, cornerRadius } = props;

  const cardStyle = isIOS()
    ? {
        container: {
          shadowRadius: elevation,
          shadowOpacity: opacity,
          shadowOffset: { width: 0, height: elevation! },
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
          width: Dimensions.get('window').width - Size.px(32),
        },
      }
    : {
        container: {
          elevation: elevation,
          borderRadius: cornerRadius,
          backgroundColor: props.backgroundColor,
          width: Dimensions.get('window').width - Size.px(32),
        },
      };

  return <View style={[cardStyle.container, props.style]}>{children}</View>;
};

Card.defaultProps = {
  backgroundColor: '#ffffff',
  elevation: 3,
  cornerRadius: 5,
  opacity: 0.5,
};

export default Card;
