/**
 * 从数组中排除一些项
 * @param arry
 * @param keys
 */
export function arrayOmitBy(arry: { label: string; value: number }[], keys: string[]) {
  return arry.filter(item => !keys.includes(item.label));
}

/**
 * 从数组中选择一些项
 * @param arry
 * @param keys
 */
export function arrayPickBy(arry: { label: string; value: number }[], keys: string[]) {
  return arry.filter(item => keys.includes(item.label));
}

/**
 * 打乱数组顺序
 * @param array
 */
export function arrayRandom(array: string[]) {
  let len = array.length;
  let index, temp;
  while (len > 0) {
    index = Math.floor(Math.random() * len);
    temp = array[len - 1];
    array[len - 1] = array[index];
    array[index] = temp;
    len--;
  }
  return array;
}
