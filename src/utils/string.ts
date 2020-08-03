import produce from 'immer';
import DeviceInfo from 'react-native-device-info';

/**
 * 用于字符长度超过指定个数自动截取并添加...
 */
export const textEllipsis = (text: string, length: number) => {
  if (text.length > length && length > 0) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export function convertNullToEmptyString<T extends {}>(obj: T) {
  return produce(obj, draft => {
    Object.entries(draft).forEach(([key, val]) => {
      if (val === null || val === undefined) {
        draft[key] = '';
      }
    });
  });
}

/**
 * 格式化数字
 * @param value
 * @param dots 小数位
 */
export const formatNumber = (value?: number | string, dots = 4) => {
  if (value) {
    if (typeof value === 'string' && !Number.isNaN(+value)) {
      return Number(value).toFixed(dots);
    } else if (typeof value === 'number') {
      return Number(value).toFixed(dots);
    }
  }
  return '0';
};

// eslint-disable-next-line complexity
export const compareVersion = (targetVersion: string): number => {
  const currentVersion = DeviceInfo.getVersion();

  const GTR = 1; //大于
  const LSS = -1; //小于
  const EQU = 0; //等于

  const currentVersionArry = currentVersion.split('.').map(function (a) {
    return parseInt(a);
  });
  const targetVersionArry = targetVersion.split('.').map(function (a) {
    return parseInt(a);
  });
  const arrLen = Math.max(currentVersionArry.length, targetVersionArry.length);

  //检查空字符串，任何非空字符串都大于空字符串
  if (currentVersion.length == 0 && targetVersion.length == 0) {
    return EQU;
  } else if (currentVersion.length == 0) {
    return LSS;
  } else if (targetVersion.length == 0) {
    return GTR;
  }

  let result = EQU;
  //循环比较版本号
  for (let i = 0; i < arrLen; i++) {
    result = compareNumber(currentVersionArry[i], targetVersionArry[i]);
    if (result == EQU) {
      continue;
    } else {
      break;
    }
  }
  return result;

  function compareNumber(n1 = 0, n2 = 0) {
    if (n1 > n2) {
      return GTR;
    } else if (n1 < n2) {
      return LSS;
    } else {
      return EQU;
    }
  }
};
