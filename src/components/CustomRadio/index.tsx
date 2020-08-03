import React from 'react';
import { Flex } from '@ant-design/react-native';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Size, Color } from '@/config';

interface RadioItemProps {
  key: number | string;
  value: string;
}

interface CustomRadioProps {
  value?: number | string;
  onChange?: (value: number | string) => void;
  options: RadioItemProps[];
}

const { px } = Size;
export default function CustomRadio(props: CustomRadioProps) {
  const { value, onChange, options } = props;

  return (
    <View>
      {options.map(item => {
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => {
              if (!!onChange) {
                onChange(item.key);
              }
            }}
            style={{ marginVertical: px(9) }}
          >
            <Flex>
              <Image
                source={
                  value === item.key
                    ? require('@/assets/radio_select_active.png')
                    : require('@/assets/radio_select.png')
                }
                style={{ width: px(16), height: px(16) }}
              />
              <Text style={styles.text}>{item.value}</Text>
            </Flex>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    borderTopWidth: Size.ONE_PIXEL,
    borderTopColor: Color.borderColor,
    paddingVertical: px(12),
  },
  checked: {
    width: px(16),
    height: px(16),
    borderWidth: Size.ONE_PIXEL,
    borderRadius: px(16),
    borderColor: Color.rankTextActiveColor,
  },
  circular: {
    width: px(16),
    height: px(16),
    borderWidth: Size.ONE_PIXEL,
    borderRadius: px(16),
    borderColor: Color.circularBorder,
  },
  text: {
    fontSize: px(14),
    fontWeight: '400',
    color: Color.middleTextColor,
    marginLeft: px(8),
  },
});
