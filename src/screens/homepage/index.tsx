import React from 'react';
import { Box, Text, WhiteSpace, WingBlank } from '@td-design/react-native';

import Container from '@/components/Container';

export default function () {
  return (
    <Container>
      <WingBlank>
        <Box>
          <Text variant="primaryBody">hello, td-design</Text>
        </Box>
        <WhiteSpace />
        <Box>
          <Text variant="primaryTipReverse">hello, react-native</Text>
        </Box>
      </WingBlank>
    </Container>
  );
}
