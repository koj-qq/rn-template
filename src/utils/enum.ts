/**
 * 获取枚举对象左侧的keys
 * @param enumObj
 */
export const enumKeys = (enumObj: object) => {
  const keys: (string | number)[] = [];
  const allKeys = Object.keys(enumObj);
  allKeys.filter(item => {
    if (Number.isNaN(+item)) {
      keys.push(item);
    }
  });
  return keys;
};

/**
 * 枚举对象转换成options
 * @param enumObj
 */
export const enumToOptions = (enumObj: object) =>
  enumKeys(enumObj).map(key => ({ label: key as string, value: enumObj[key] }));

/**
 * 根据enum的值，得到enum的key
 * @param enumObj
 * @param val
 */
export function getEnumName(enumObj: object, val?: number | string) {
  let name = '';
  if (val !== undefined) {
    const item = enumToOptions(enumObj).find(item => item.value === val);
    if (item) {
      name = item.label;
    }
  }
  return name;
}
