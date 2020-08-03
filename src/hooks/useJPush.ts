import { useEffect } from 'react';
import JPush, { Extra, Sequence, Tags, Alias, Tag } from 'jpush-react-native';

type TagAliasCallbackResult =
  | ({
      code: number;
    } & Sequence &
      Tags)
  | ({
      code: number;
    } & Sequence &
      Alias)
  | ({
      code: number;
    } & Sequence &
      Tag & {
        tagEnable: boolean;
      });

export default function useJPush() {
  useEffect(() => {
    JPush.init();

    //连接状态
    const connectListener = (result: { connectEnable: boolean }) => {
      console.log('connectListener:' + JSON.stringify(result));
    };
    JPush.addConnectEventListener(connectListener);
    //通知回调
    const notificationListener = (result: {
      messageID: string;
      title: string;
      content: string;
      badge: string;
      ring: string;
      extras: Extra;
      notificationEventType: 'notificationArrived' | 'notificationOpened';
    }) => {
      console.log('notificationListener:' + JSON.stringify(result));
    };
    JPush.addNotificationListener(notificationListener);
    //本地通知回调
    const localNotificationListener = (result: {
      messageID: string;
      title: string;
      content: string;
      extras: Extra;
      notificationEventType: 'notificationArrived' | 'notificationOpened';
    }) => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(localNotificationListener);
    //自定义消息回调
    const customMessageListener = (result: { messageID: string; content: string; extras: Extra }) => {
      console.log('customMessageListener:' + JSON.stringify(result));
    };
    JPush.addCustomMessagegListener(customMessageListener);
    //tag alias事件回调
    const tagAliasListener = (result: TagAliasCallbackResult) => {
      console.log('tagAliasListener:' + JSON.stringify(result));
    };
    JPush.addTagAliasListener(tagAliasListener);
    //手机号码事件回调
    const mobileNumberListener = (
      result: {
        code: number;
      } & Sequence
    ) => {
      console.log('mobileNumberListener:' + JSON.stringify(result));
    };
    JPush.addMobileNumberListener(mobileNumberListener);
  }, []);
}
