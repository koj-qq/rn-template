type Extra = {
  [key: string]: string;
};

type Sequence = {
  /**
   * 请求时传入的序列号,会在回调时原样返回
   */
  sequence: number;
};

type Tag = {
  /**
   * 有效的标签组成：字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|
   * 限制：每个 tag 命名长度限制为 40 字节,最多支持设置 1000 个 tag,且单次操作总长度不得超过 5000 字节
   *（判断长度需采用 UTF-8 编码）单个设备最多支持设置 1000 个 tag。App 全局 tag 数量无限制
   */
  tag: string;
};

type Tags = {
  /**
   * 有效的标签组成：字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|
   * 限制：每个 tag 命名长度限制为 40 字节,最多支持设置 1000 个 tag,且单次操作总长度不得超过 5000 字节
   *（判断长度需采用 UTF-8 编码）单个设备最多支持设置 1000 个 tag。App 全局 tag 数量无限制
   */
  tags: string[];
};

type Alias = {
  /**
   * 有效的别名组成：字母（区分大小写）、数字、下划线、汉字、特殊字符@!#$&*+=.|
   * 限制：alias 命名长度限制为 40 字节。（判断长度需采用 UTF-8 编码）
   */
  alias: string;
};

export type ConnectListenerCallbackResult = {
  /**
   * connectEnable: 连接状态
   */
  connectEnable: boolean;
};

export type NotificationListenerCallbackResult = {
  /**
   *  messageID:唯一标识通知消息的 ID
   */
  messageID: string;
  /**
   *  title:对应 Portal 推送通知界面上的“通知标题”字段
   */
  title: string;
  /**
   *  content:对应 Portal 推送通知界面上的“通知内容”字段
   */
  content: string;
  /**
   *  badge:对应 Portal 推送通知界面上的可选设置里面的“badge”字段 (ios only)
   */
  badge: string;
  /**
   *  ring:对应 Portal 推送通知界面上的可选设置里面的“sound”字段 (ios only)
   */
  ring: string;
  /**
   *  extras:对应 Portal 推送消息界面上的“可选设置”里的附加字段
   */
  extras: Extra;
  /**
   *  notificationEventType：分为notificationArrived和notificationOpened两种
   */
  notificationEventType: 'notificationArrived' | 'notificationOpened';
};

export type LocalNotificationListenerCallbackResult = {
  /**
   * 唯一标识通知消息的ID,可用于移除消息
   */
  messageID: string;
  /**
   * 对应“通知标题”字段
   */
  title: string;
  /**
   * 对应“通知内容”字段
   */
  content: string;
  /**
   * 对应“附加内容”字段
   */
  extras: Extra;
  notificationEventType: 'notificationArrived' | 'notificationOpened';
};

export type CustomMessageListenerCallbackResult = {
  /**
   * 唯一标识自定义消息的 ID
   */
  messageID: string;
  /**
   * 对应 Portal 推送消息界面上的“自定义消息内容”字段
   */
  content: string;
  /**
   * 对应 Portal 推送消息界面上的“可选设置”里的附加字段
   */
  extras: Extra;
};

export type TagAliasListenerCallbackResult = {
  /**
   * 结果, 0为操作成功
   */
  code: number;
} & Sequence &
  (
    | Tags
    | Alias
    | (Tag & {
        /**
         * 执行查询指定tag(queryTag)操作时会返回是否可用
         */
        tagEnable: boolean;
      })
  );

export type MobileNumberListenerCallbackResult = { code: number } & Sequence;
