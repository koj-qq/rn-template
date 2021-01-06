import { extend, ResponseError } from 'umi-request';
import { getToken } from './utils/auth';
import { LoginFailureEnum } from './enums';

let controller = new AbortController();
export const initRequest = async () => {
  const token = await getToken();

  const request = extend({
    useCache: false,
    ttl: 6000,
    headers: {
      'Content-Type': 'application/json',
      accessToken: token,
    },
    errorHandler,
    signal: controller.signal,
  });

  // request.use(async (ctx, next) => {
  //   await next(); // next的声明有问题，这里await不能省
  //   const { res, req } = ctx;
  //   const { params, data } = req.options;
  //   let paramData = params;
  //   if (isEmpty(params)) {
  //     paramData = data;
  //   }
  //   console.log(req.url, paramData, res);
  // });

  request.interceptors.response.use(
    response => {
      response
        .clone()
        .json()
        .then(res => {
          if (LoginFailureEnum.失效 === res.code || LoginFailureEnum.封禁 === res.code) {
            controller.abort();
            controller = new AbortController();
          }
        });
      return response;
    },
    { global: false }
  );

  return request;
};

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const EMPTY_PARAM_RESULT = { page: PAGE, total: 0, pageSize: PAGE_SIZE, list: [] };

export function removeEmpty(obj: object) {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (!['', null, undefined].includes(obj[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

const codeMessage: { [key: number]: string } = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求的接口地址不存在。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function errorHandler(error: ResponseError) {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    throw new Error(
      JSON.stringify({
        message: errorText,
        description: `请求错误 ${status}: ${url}`,
      })
    );
  }
  throw error;
}
