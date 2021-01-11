import React, { useContext } from 'react';
import { Button, Text } from '@td-design/react-native';
import Container from '@/common/components/Container';

import { AuthService } from '../useAuthService';

export default () => {
  const authService = useContext(AuthService);

  return (
    <Container>
      <Text testID="signIn">signIn</Text>
      <Button
        title="登录"
        onPress={() => {
          authService.saveToken('123');
          authService.saveUserInfo({ name: 'zhangsan' });
        }}
      />
    </Container>
  );
};
