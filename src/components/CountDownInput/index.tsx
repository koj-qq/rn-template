import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Flex } from '@ant-design/react-native';
import Input from '../Input';
import Iconfont from '../Iconfont';
import { Color, Size } from '@/config';
import { MAX_LENGTH_SMS } from '@/utils/validation';
import useSms from '@/hooks/useSms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PHONE_TYPE } from '@/common';

/**
 * 验证码输入框
 */
const CountDownInput: React.FC<{
  mobile: string;
  type: PHONE_TYPE;
  value?: string;
  onChange?: (value?: string) => void;
}> = props => {
  const { sendSms, smsText, disabled } = useSms();
  const [val, setVal] = useState<string>();

  const handleChange = (text: string) => {
    setVal(text);
    if (props.onChange) {
      props.onChange(text);
    }
  };

  return (
    <Flex style={styles.item}>
      <Iconfont style={styles.icon} name="login_verify" size={24} color={Color.primary} />
      <Input
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        style={styles.input}
        placeholder="请输入验证码"
        keyboardType="number-pad"
        maxLength={MAX_LENGTH_SMS}
        value={val}
        onChangeText={handleChange}
      />
      <TouchableOpacity
        style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
        activeOpacity={0.8}
        onPress={() => {
          if (!disabled) {
            sendSms(props.mobile);
          }
        }}
      >
        <Text style={styles.extraText}>{smsText}</Text>
      </TouchableOpacity>
    </Flex>
  );
};

export default CountDownInput;

const styles = StyleSheet.create({
  item: {
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: Size.px(16),
    borderRadius: 4,
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40),
  },
  input: {
    flex: 7,
    fontSize: Size.px(16),
    color: Color.middleTextColor,
  },
  extraText: {
    textAlign: 'right',
    color: Color.primary,
    paddingRight: Size.px(10),
  },
});
