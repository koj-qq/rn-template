import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertNullToEmptyString } from '@/utils';

const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';

export const saveToken = (token: string) => {
  AsyncStorage.setItem(TOKEN_KEY, token);
};

export async function getToken() {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return result || '';
}

export function saveUserInfo<T>(info: T) {
  const userInfo = convertNullToEmptyString(info);
  AsyncStorage.setItem(USER_INFO, JSON.stringify(userInfo));
}

/**
 * @功能描述: 退出登录
 * @参数:
 * @返回值:
 */
export function signOut() {
  return new Promise((resolve, reject) => {
    Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_INFO)])
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
