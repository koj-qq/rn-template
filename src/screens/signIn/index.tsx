import React, { useState, useContext } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { Button, WingBlank, Flex, Checkbox } from '@ant-design/react-native';
import Form, { useForm, Field } from 'rc-field-form';
import { ValidateErrorEntity, Store } from 'rc-field-form/es/interface';
import { MAX_LENGTH_PHONE, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD, phoneRegex } from '@/utils/validation';
import { Color, Size } from '@/config';
import { Container, Input, Iconfont, FormView } from '@/components';
import useToast from '@/hooks/useToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCustomRequest } from '@/hooks/useCustomRequest';
import JPush from 'jpush-react-native';
import { saveUserInfo, saveToken } from '@/utils/auth';
import { AuthContext } from '@/context/AuthContext';

import { fakeFetch, fakeLogin } from './service';

export default () => {
  const [form] = useForm();
  const { startLoading, finishLoading, toastFail } = useToast();
  const [checked, setChecked] = useState(false);
  const { signIn } = useContext(AuthContext);

  const { run: fetchUserInfo } = useCustomRequest(fakeFetch, {
    manual: true,
    onSuccess: data => {
      saveUserInfo(data);
      JPush.setAlias({ sequence: 1, alias: data.userId + '' });
      signIn();
    },
  });

  const { run: login } = useCustomRequest(fakeLogin, {
    manual: true,
    onSuccess: async data => {
      finishLoading();
      await saveToken(data.accessToken ?? '');
      fetchUserInfo();
    },
    onError: () => {
      toastFail('对不起，登录失败');
    },
  });

  const handleFinish = (values: Store) => {
    startLoading('正在登录...');
    login({
      username: values.username,
      password: values.password,
    });
  };

  const handleFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
    if (errorFields.length > 0) {
      toastFail(errorFields[0].errors[0]);
    }
  };

  return (
    <Container>
      <FormView type="View">
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          enableOnAndroid
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always" // 解决键盘关闭后点击登录无反应，需要再点一次的问题
          extraHeight={Platform.select({ android: 160 })}
        >
          <WingBlank>
            <Form component={false} onFinish={handleFinish} onFinishFailed={handleFinishFailed} form={form}>
              <Flex style={styles.item}>
                <Iconfont style={styles.icon} name="login_iphone" size={Size.px(24)} color={Color.primary} />
                <Field
                  name="username"
                  rules={[
                    { required: true, message: '请输入手机号' },
                    { pattern: phoneRegex, message: '手机号码格式不正确' },
                  ]}
                  trigger="onChangeText"
                  validateTrigger="onChangeText"
                >
                  <Input
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    style={styles.input}
                    placeholder="请输入手机号"
                    keyboardType="phone-pad"
                    maxLength={MAX_LENGTH_PHONE}
                  />
                </Field>
              </Flex>
              <Flex style={styles.item}>
                <Iconfont style={styles.icon} name="icon_login_password" size={Size.px(24)} color={Color.primary} />
                <Field
                  name="password"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: MIN_LENGTH_PASSWORD, message: `密码最少为${MIN_LENGTH_PASSWORD}位` },
                    { max: MAX_LENGTH_PASSWORD, message: `密码最多为${MAX_LENGTH_PASSWORD}位` },
                  ]}
                  trigger="onChangeText"
                >
                  <Input
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    style={styles.input}
                    secureTextEntry
                    placeholder={`请输入${MIN_LENGTH_PASSWORD}-${MAX_LENGTH_PASSWORD}位密码`}
                    maxLength={MAX_LENGTH_PASSWORD}
                  />
                </Field>
              </Flex>
              <Checkbox
                style={{ marginVertical: Size.px(10), marginRight: Size.px(10) }}
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              >
                <Text>
                  我已阅读并同意
                  <Text style={{ color: Color.primary }}>《用户服务协议》</Text>和
                  <Text style={{ color: Color.primary }}>《隐私政策》</Text>
                </Text>
              </Checkbox>
              <Button type="primary" disabled={!checked} onPress={() => form.submit()}>
                <Text>登录</Text>
              </Button>
            </Form>
          </WingBlank>
        </KeyboardAwareScrollView>
      </FormView>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    height: Size.px(56),
    paddingLeft: Size.px(12),
    paddingBottom: Size.px(5),
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: Size.px(16),
    borderRadius: Size.px(4),
  },
  icon: {
    flex: 1,
    height: Size.px(40),
    lineHeight: Size.px(40),
  },
  input: {
    flex: 7,
    fontSize: Size.px(16),
    color: Color.middleTextColor,
  },
});
