import React from 'react';
import { Image } from 'react-native';
import { Box, Text, WhiteSpace } from '@td-design/react-native';
import Container from '@/common/components/Container';

export default function Homepage() {
  return (
    <Container>
      <Box>
        <Text>hello, td-design</Text>
        <WhiteSpace />
        <Image source={require('@/assets/certify_fail.webp')} style={{ width: 200, height: 200 }} />
      </Box>
    </Container>
  );
}
