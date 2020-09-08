import { useRequest } from 'ahooks';
import { CombineService, BaseOptions } from '@ahooksjs/use-request/lib/types';
import NetInfo from '@react-native-community/netinfo';
import { Toast } from '@ant-design/react-native';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LOGIN_FAILURE } from '@/common';
import useToast from './useToast';

export function useCustomRequest<R, P extends unknown[] = []>(
  service: CombineService<R, P>,
  options: BaseOptions<R, P> = {}
) {
  const { signOut } = useContext(AuthContext);
  const { toastFail } = useToast();
  const [netReady, setNetReady] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.fail('设备未连接网络');
      }
      setNetReady(state.isConnected);
    });
  }, []);

  const { ready, refreshDeps = [], onError, ...restOptions } = options;
  const result = useRequest(service, {
    refreshDeps: [netReady, ...refreshDeps],
    ready: netReady && ready,
    throwOnError: true,
    onError: (error, params) => {
      onError && onError(error, params);
      try {
        const { code, message } = JSON.parse(error.message);
        if (code === LOGIN_FAILURE.失效 || code === LOGIN_FAILURE.封禁) {
          signOut();
        }
        toastFail(message);
      } catch (err) {
        toastFail(err.message);
      }
    },
    ...restOptions,
  });
  return result;
}
