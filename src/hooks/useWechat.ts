import * as Wechat from 'react-native-wechat-lib';
import useToast from './useToast';

export default function useWechat() {
  const { toastSuccess } = useToast();

  const isWXAppInstalled = async () => {
    const result = await Wechat.isWXAppInstalled();
    toastSuccess(result + '');
  };
  const isWXAppSupportApi = async () => {
    const result = await Wechat.isWXAppSupportApi();
    toastSuccess(result + '');
  };
  const getApiVersion = async () => {
    const result = await Wechat.getApiVersion();
    toastSuccess(result);
  };
  const openWXApp = () => {
    Wechat.openWXApp();
  };
  const sendAuthRequest = async () => {};
  const shareText = async () => {
    const { errCode } = await Wechat.shareText({
      text: '你好啊，我是漫蝌世界',
      scene: 0,
    });
    toastSuccess(errCode + '');
  };
  const shareImage = async () => {};
  const shareLocalImage = async () => {};
  const shareMusic = async () => {};
  const shareVideo = async () => {};
  const shareWebpage = async () => {
    const { errCode } = await Wechat.shareWebpage({
      webpageUrl: 'www.baidu.com',
      title: '百度',
      description: '不要用它',
      thumbImageUrl: 'https://pbs.twimg.com/profile_images/938436175366209536/BdWf35Wt_400x400.jpg',
    });
    toastSuccess(errCode + '');
  };
  const shareMiniProgram = async () => {};
  const launchMiniProgram = async () => {};
  const wechatPay = async () => {};

  return {
    isWXAppInstalled,
    isWXAppSupportApi,
    getApiVersion,
    openWXApp,
    sendAuthRequest,
    shareText,
    shareImage,
    shareLocalImage,
    shareMusic,
    shareVideo,
    shareWebpage,
    shareMiniProgram,
    launchMiniProgram,
    wechatPay,
  };
}
