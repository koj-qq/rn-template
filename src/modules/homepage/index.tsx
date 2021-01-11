import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Box, Button, Text, WhiteSpace } from '@td-design/react-native';
import Container from '@/common/components/Container';
import { AuthService } from '../Auth/useAuthService';

export default function Homepage() {
  const authService = useContext(AuthService);

  return (
    <Container>
      <Box>
        <Text testID="homepage">Homepage</Text>
        <Text>hello, td-design</Text>
        <WhiteSpace />
        <Image source={require('@/assets/certify_fail.webp')} style={{ width: 200, height: 200 }} />
        <WhiteSpace />
        <Button title="退出登录" onPress={() => authService.logout()} />
      </Box>
    </Container>
  );
}
