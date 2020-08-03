import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { Size, Color } from '@/config';

interface AvatarProps {
  uri?: string;
  width?: number;
  style?: ImageStyle;
}
const Avatar: React.FC<AvatarProps> = ({ uri, width = Size.px(44), style }) => (
  <Image
    source={
      uri
        ? {
            uri,
          }
        : require('@/assets/avatar.png')
    }
    style={[
      {
        width,
        height: width,
        borderRadius: width / 2,
        borderColor: Color.white,
        borderWidth: uri ? Size.px(2) : 0,
      },
      style,
    ]}
  />
);
export default Avatar;
