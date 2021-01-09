import { useCallback, useMemo, useState } from 'react';
import * as authUtil from '@/utils/auth';
import { makeContext } from '@/utils/contextFactory';

export interface UserInfo {
  name: string;
}

export default function useAuthService() {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>();

  /** 保存token */
  const saveToken = useCallback((token: string) => {
    setToken(token);
    authUtil.saveToken(token);
  }, []);

  /** 保存登录人基本信息 */
  const saveUserInfo = useCallback((userInfo: UserInfo) => {
    setUserInfo(userInfo);
    authUtil.saveUserInfo(userInfo);
  }, []);

  /** 是否登录 */
  const signedIn = useMemo(() => token !== '', [token]);

  /** 退出登录 */
  const logout = useCallback(async () => {
    await authUtil.signOut();
    setToken('');
    setUserInfo(undefined);
  }, []);

  return {
    token,
    saveToken,
    userInfo,
    saveUserInfo,
    signedIn,
    logout,
  };
}

export const AuthService = makeContext(useAuthService);
