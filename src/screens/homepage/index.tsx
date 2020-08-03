import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Container } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { codePushSync } from '@/utils/CodePushUtils';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    codePushSync();
  }, []);

  return (
    <Container hasHeader={false}>
      <ScrollView>
        <Text>我是主页</Text>
        <TouchableOpacity onPress={() => navigation.navigate('JPushDemo')}>
          <Text>去JPush示例页面</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
