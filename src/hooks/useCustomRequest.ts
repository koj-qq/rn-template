import { useRequest } from 'ahooks';
import { CombineService, BaseOptions } from '@ahooksjs/use-request/lib/types';
import NetInfo from '@react-native-community/netinfo';
import { Toast } from '@ant-design/react-native';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LOGIN_FAILURE } from '@/common';

export function useCustomRequest<R, P extends unknown[] = []>(
  service: CombineService<R, P>,
  options: BaseOptions<R, P> = {}
) {
  const { signOut } = useContext(AuthContext);
  const [netReady, setNetReady] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.fail('设备未连接网络');
      }
      setNetReady(state.isConnected);
    });
  }, []);

  const { ready, refreshDeps = [], ...resOptions } = options;
  const result = useRequest(service, {
    refreshDeps: [netReady, ...refreshDeps],
    ready: netReady && ready,
    throwOnError: true,
    ...resOptions,
  });
  const { error } = result;
  if (error) {
    try {
      const { code } = JSON.parse(error.message);
      if (code === LOGIN_FAILURE.失效 || code === LOGIN_FAILURE.封禁) {
        signOut();
      }
    } catch (error) {}
  }
  return result;
}
