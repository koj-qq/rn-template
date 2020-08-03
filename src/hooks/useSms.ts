import { useState, useRef } from 'react';
import { isPhone } from '@/utils/validation';
import BackgroundTimer from 'react-native-background-timer';
import { isIOS } from '@/config/size';
import useToast from './useToast';

export default function useSms() {
  let interval: NodeJS.Timeout;
  const [disabled, setDisabled] = useState(false);
  const [smsText, setSmsText] = useState('获取验证码');
  const countRef = useRef(60);
  const { toastSuccess, toastFail } = useToast();

  function intervalFn() {
    countRef.current = countRef.current - 1;
    setSmsText(`${countRef.current}s`);
    if (countRef.current === 0) {
      if (isIOS()) {
        clearInterval(interval);
        BackgroundTimer.stop();
      } else {
        BackgroundTimer.clearInterval(interval);
      }
      countRef.current = 60;
      setSmsText('获取验证码');
      setDisabled(false);
    }
  }

  const sendSms = async (mobile: string) => {
    if (!mobile || !isPhone(mobile)) {
      toastFail('请输入正确的手机号码');
    } else {
      try {
        setDisabled(true);
        toastSuccess('验证码发送成功');
        if (isIOS()) {
          BackgroundTimer.start();
          interval = setInterval(() => {
            intervalFn();
          }, 1000);
        } else {
          interval = BackgroundTimer.setInterval(() => {
            intervalFn();
          }, 1000);
        }
        // 发请求
      } catch (error) {
        toastFail('验证码获取失败');
      }
    }
  };

  const clearSms = () => {
    if (isIOS()) {
      clearInterval(interval);
      BackgroundTimer.stop();
    } else {
      BackgroundTimer.clearInterval(interval);
    }
    setDisabled(false);
    setSmsText('获取验证码');
  };

  return { smsText, sendSms, clearSms, disabled } as const;
}
