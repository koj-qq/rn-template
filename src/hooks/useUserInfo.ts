import { useEffect, useState } from 'react';
import { getUserInfo, saveUserInfo, UserDTO } from '@/utils/auth';

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserDTO>();

  useEffect(() => {
    (async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    })();
  }, [setUserInfo]);

  const updateUserInfo = (params: UserDTO) => {
    saveUserInfo({ ...userInfo, ...params });
    setUserInfo({ ...userInfo, ...params });
  };

  return { userInfo, updateUserInfo };
}
