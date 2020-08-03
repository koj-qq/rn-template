import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { StackHeaderProps, StackHeaderLeftButtonProps, StackNavigationOptions, Header } from '@react-navigation/stack';
import { extend } from 'umi-request';
import DeviceInfo from 'react-native-device-info';
import { Color, Size } from '@/config';
import { errorHandler } from './utils/errorHandler';
import { getToken } from './utils/auth';
import { isEmpty } from 'lodash-es';

export const commonStackOptions: StackNavigationOptions = {
  header: (props: StackHeaderProps) => <Header {...props} />,
  headerTitleStyle: {
    fontWeight: '500',
    color: Color.middleTextColor,
    fontSize: Size.px(18),
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerLeft: (props: StackHeaderLeftButtonProps) =>
    props.canGoBack && (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: Size.px(10) }}>
        <IconOutline name="left" size={Size.px(24)} color={Color.primary} />
      </TouchableOpacity>
    ),
};

export enum PHONE_TYPE {
  REGISTER = 0, // 手机号不存在
  MODIFY = 1, // 修改密码
  LOGIN = 2, // 登录
}

export enum LOGIN_FAILURE {
  失效 = 50400,
  封禁 = 50401,
}

/** 文件服务地址 */
export const FILE_URL = 'http://object-service.dev.thundersdata.com';

const platform = Platform.OS;
let controller = new AbortController();
export const initRequest = async () => {
  const token = await getToken();
  const deviceName = await DeviceInfo.getModel();
  const deviceNo = await DeviceInfo.getUniqueId();

  const request = extend({
    useCache: false,
    ttl: 6000,
    headers: {
      'Content-Type': 'application/json',
      clientId: 'rnTemplate-app',
      deviceSystem: platform,
      deviceName: decodeURI(deviceName),
      deviceNo,
      accessToken: token,
    },
    errorHandler,
    signal: controller.signal,
  });

  request.use(async (ctx, next) => {
    await next();
    const { res, req } = ctx;
    const { params, data } = req.options;
    let paramData = params;
    if (isEmpty(params)) {
      paramData = data;
    }
    console.log(req.url, paramData, res);
  });

  request.interceptors.response.use(response => {
    response
      .clone()
      .json()
      .then(res => {
        if (LOGIN_FAILURE.失效 === res.code || LOGIN_FAILURE.封禁 === res.code) {
          controller.abort();
          controller = new AbortController();
        }
      });
    return response;
  });

  return request;
};

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderTopWidth: Size.ONE_PIXEL,
    borderTopColor: Color.borderColor,
  },
});

export const FOOTER_TIPS = {
  footerRefreshingText: '数据加载中…',
  footerFailureText: '点击重新加载',
  footerNoMoreDataText: '已加载全部数据',
  footerEmptyDataText: '暂无数据',
};

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const ADDRESS_PAGE_SIZE = 100;
export const EMPTY_PARAM_RESULT = { page: 1, total: 0, pageSize: PAGE_SIZE, list: [] };

export enum WECHAT_SHARE_SCENE {
  好友 = 0,
  朋友圈 = 1,
}
