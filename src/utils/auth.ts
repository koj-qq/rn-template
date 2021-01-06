import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';

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

export async function getUserInfo() {
  const result = await AsyncStorage.getItem(USER_INFO);
  if (result) {
    return JSON.parse(result);
  }
  return {};
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

/**
 * @功能描述: 判断是否已登录
 * @参数:
 * @返回值:
 */
export async function isSignedIn() {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  return !!result;
}

export function convertNullToEmptyString<T extends {}>(obj: T) {
  return produce(obj, draft => {
    Object.entries(draft).forEach(([key, val]) => {
      if (val === null || val === undefined) {
        draft[key] = '';
      }
    });
  });
}
