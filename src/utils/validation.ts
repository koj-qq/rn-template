import { Rule } from 'rc-field-form/es/interface';

export const MAX_LENGTH_PHONE = 11;
export const MAX_LENGTH_PASSWORD = 14;
export const MIN_LENGTH_PASSWORD = 8;
export const MAX_LENGTH_SMS = 6;

export const phoneRegex = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
export const IDCardRegex = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;

export const isPhone = (phone: string) => {
  return phoneRegex.test(phone);
};

export const passwordValidator = (password: string) => (_: Rule, value: string) => {
  if (!value || password === value) {
    return Promise.resolve();
  }
  return Promise.reject('两次密码不一致');
};
