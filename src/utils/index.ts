import produce from 'immer';

export function removeEmpty(obj: object) {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (!['', null, undefined].includes(obj[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
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
