import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '@/components/Container';

export default function () {
  const myButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998">
      Login with Facebook
    </Icon.Button>
  );

  return (
    <Container>
      <View style={{ padding: 20 }}>
        <View>{myButton}</View>
      </View>
    </Container>
  );
}
