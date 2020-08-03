import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { Button, Flex, WingBlank } from '@ant-design/react-native';
import { Size, Color } from '@/config';

const { px } = Size;

interface CustomButtonProps {
  text: string; // 按钮文字
  onPress?: () => void;
  disabled?: boolean; // 是否禁用按钮
  style?: StyleProp<ViewStyle>; // 自定义style
}

const BottomButton: React.FC<CustomButtonProps> = ({ text, style, disabled, onPress, children }) => {
  return (
    <View style={{ borderTopWidth: Size.ONE_PIXEL, borderTopColor: Color.borderColor }}>
      <WingBlank>
        <Flex style={{ paddingVertical: px(12) }} justify="between">
          {children}
          <Button style={[{ flex: 1 }, style]} disabled={disabled} type="primary" onPress={onPress}>
            {text}
          </Button>
        </Flex>
      </WingBlank>
    </View>
  );
};

export default BottomButton;
