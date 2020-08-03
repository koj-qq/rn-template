import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Size, Color } from '@/config';

export default function ListItemText({
  text,
  required = false,
  isError = false,
  style,
}: {
  text?: string;
  required?: boolean;
  isError?: boolean;
  style?: TextStyle;
}) {
  return (
    <Text
      style={[{ fontSize: Size.px(16), fontWeight: '400', color: isError ? Color.red : Color.mainTextColor }, style]}
    >
      {required ? <Text style={{ color: Color.red }}>*</Text> : null}
      {text}
    </Text>
  );
}
