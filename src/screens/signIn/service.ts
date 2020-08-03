import { UserDTO } from '@/utils/auth';

export function fakeFetch(): Promise<UserDTO> {
  return new Promise(resolve => {
    setTimeout(() => {
      const user: UserDTO = {
        nickName: 'zhangsan',
        userId: 1,
      };
      resolve(user);
    }, 1500);
  });
}

export function fakeLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{
  accessToken: string;
}> {
  console.log(username, password);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        accessToken: '123',
      });
    }, 1500);
  });
}
