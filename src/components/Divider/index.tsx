import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Size, Color } from '@/config';
import { Flex } from '@ant-design/react-native';

const Divider: React.FC<{ text?: string; style?: StyleProp<ViewStyle> }> = props => (
  <View style={[styles.divider, props.style]}>
    <Flex
      style={{
        backgroundColor: Color.black,
        paddingHorizontal: Size.px(10),
        borderTopWidth: Size.ONE_PIXEL,
        borderTopColor: Color.borderColor,
        position: 'relative',
      }}
      justify="center"
    >
      <Text style={props.text ? styles.text : {}}>{props.text}</Text>
    </Flex>
  </View>
);

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: Size.px(50),
  },
  text: {
    backgroundColor: Color.white,
    textAlign: 'center',
    width: '35%',
    position: 'absolute',
  },
});
