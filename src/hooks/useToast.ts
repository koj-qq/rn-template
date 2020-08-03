import { Toast, Portal } from '@ant-design/react-native';
import { useRef, useCallback } from 'react';

export default function useToast() {
  const toastRef = useRef<number>();

  const startLoading = useCallback((text?: string) => {
    toastRef.current = Toast.loading(text || '加载中...', 0);
  }, []);

  const finishLoading = useCallback(() => {
    if (toastRef.current) {
      Portal.remove(toastRef.current);
    }
  }, []);

  const toastSuccess = useCallback((text?: string) => {
    if (toastRef.current) {
      Portal.remove(toastRef.current);
    }
    Toast.success(text || '操作成功!', 1.5);
  }, []);

  const toastFail = useCallback((text?: string) => {
    if (toastRef.current) {
      Portal.remove(toastRef.current);
    }
    Toast.fail(text || '操作失败！', 1.5);
  }, []);

  const offline = useCallback(() => {
    if (toastRef.current) {
      Portal.remove(toastRef.current);
    }
    Toast.offline('网络连接失败！', 1.5);
  }, []);

  return {
    startLoading,
    finishLoading,
    toastSuccess,
    toastFail,
    offline,
  };
}
