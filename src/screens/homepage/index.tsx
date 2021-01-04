import React from 'react';
import { Box, Text, WhiteSpace } from '@td-design/react-native';
import Container from '@/components/Container';
// import { Text } from 'react-native';

export default function Homepage() {
  return (
    // <Text>hello</Text>
    <Container>
      <Box>
        <Text>hello, td-design</Text>
        <WhiteSpace />
        <Text>hello, react-native</Text>
      </Box>
    </Container>
  );
}
