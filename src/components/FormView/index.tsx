import React from 'react';
import { TouchableOpacity, ScrollView, Keyboard, ViewStyle, ScrollViewProps, StyleProp } from 'react-native';

interface FormViewProps {
  type: 'View' | 'ScrollView';
  style?: StyleProp<ViewStyle>;
  ScrollViewProps?: ScrollViewProps;
}

const FormView: React.FC<FormViewProps> = props => {
  const { type, style = { flex: 1 }, children, ScrollViewProps = {} } = props;

  return type === 'View' ? (
    <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} activeOpacity={1} style={style}>
      {children}
    </TouchableOpacity>
  ) : (
    <ScrollView style={style} keyboardShouldPersistTaps="never" {...ScrollViewProps}>
      {children}
    </ScrollView>
  );
};
export default FormView;
