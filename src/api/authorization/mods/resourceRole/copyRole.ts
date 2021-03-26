/**
 * @description 拷贝角色资源新建角色
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/role/resource/copyRole', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}