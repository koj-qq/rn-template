import React, { ReactNode } from 'react';
import { TextInput, TextInputProps, View, Text, ViewStyle, TextStyle } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { Size, Color } from '../../config';

const { px } = Size;
export type CustomInputProps = Merge<
  TextInputProps,
  {
    onChange?: (value: string) => void;
    value?: string;
    extra?: string | ReactNode;
    readonly?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
  }
>;

const CustomInput: React.FC<CustomInputProps> = props => {
  const { onChange, value, extra, children, readonly = false, ...restProps } = props;

  return (
    <View style={[{ paddingLeft: px(16) }, props.style]}>
      <Flex
        justify="between"
        align="center"
        style={{
          height: px(54),
          paddingRight: px(16),
          borderBottomWidth: Size.ONE_PIXEL,
          borderBottomColor: Color.borderColor,
        }}
      >
        {children}
        <Flex align="center" justify="end" style={{ flex: 3 }}>
          {readonly ? (
            <Text style={{ color: Color.middleTextColor, marginRight: px(10) }}>{value}</Text>
          ) : (
            <TextInput
              value={value}
              onChangeText={onChange}
              {...restProps}
              style={[
                {
                  paddingVertical: px(8),
                  color: Color.mainTextColor,
                  fontSize: Size.px(14),
                  width: '100%',
                  textAlign: 'right',
                },
                props.textStyle,
              ]}
            />
          )}
          {extra && <View>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</View>}
        </Flex>
      </Flex>
    </View>
  );
};

export default CustomInput;
