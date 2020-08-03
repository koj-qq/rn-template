import React, { useContext } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '@/components';
import useUserInfo from '@/hooks/useUserInfo';
import { AuthContext } from '@/context/AuthContext';
import { Modal } from '@ant-design/react-native';

export default () => {
  const { userInfo } = useUserInfo();
  const { signOut } = useContext(AuthContext);

  const logout = () => {
    Modal.alert(
      '退出登录',
      '您确定退出登录吗',
      [
        { text: '取消', onPress: () => {} },
        {
          text: '确定',
          onPress: signOut,
        },
      ],
      () => true
    );
  };

  return (
    <Container hasHeader={false}>
      <ScrollView>
        <Text>我是个人中心页面</Text>
        <Text>{userInfo?.nickName}</Text>
        <TouchableOpacity onPress={logout}>
          <Text>退出</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
