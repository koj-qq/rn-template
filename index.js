import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as Sentry from '@sentry/react-native';
import * as Wechat from 'react-native-wechat-lib';

// 注册微信
Wechat.registerApp('wxf944827d02b2dabc', 'https://rnTemplate/app/').catch(error => {
  console.log(error);
});

Sentry.init({
  dsn: 'http://4c9a0f835f344d90893218817dfcc8e2:e76c3632f21944fbb40964477e432d66@192.168.0.201:29177/9',
  // 监控运行状况
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});

// 方言
dayjs.locale('zh-cn');
console.disableYellowBox = true;

/**这段代码加上之后，才可以在debug的时候看到网络请求 */
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

AppRegistry.registerComponent(appName, () => App);
