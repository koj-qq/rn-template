import React from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle } from 'react-native';
import { Size, Color } from '@/config';
import { Flex } from '@ant-design/react-native';

const { px } = Size;
export default ({ text, onPress, style }: { text: string; onPress: () => void; style?: StyleProp<TextStyle> }) => {
  return (
    <Flex justify="center" align="center" style={{ height: px(40) }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Text
          style={[
            {
              fontSize: px(16),
              lineHeight: px(22),
              color: Color.primary,
            },
            style,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Flex>
  );
};
