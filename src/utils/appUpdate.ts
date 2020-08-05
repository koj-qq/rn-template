import { Platform, Linking } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export function appUpdate(androidDownloadUrl: string, appStoreUrl: string, version: string) {
  if (Platform.OS === 'android') {
    const android = RNFetchBlob.android;
    RNFetchBlob.config({
      addAndroidDownloads: {
        // 调起原生下载管理
        useDownloadManager: true,
        // 下载的安装包保存的名字
        title: `rnTemplate-${version}.apk`,
        // 下载时候顶部通知栏的描述
        description: '下载完成之后将会自动安装',
        // 下载的文件格式
        mime: 'application/vnd.android.package-archive',
        // 下载完成之后扫描下载的文件
        mediaScannable: true,
        // 通知栏显示下载情况
        notification: true,
      },
      // 文件下载的同时缓存起来，提高操作效率
      fileCache: true,
    })
      .fetch('GET', androidDownloadUrl)
      .then(res => {
        android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    Linking.canOpenURL(appStoreUrl)
      .then(supported => {
        if (!supported) {
          console.warn('找不到对应的应用');
          return false;
        }
        return Linking.openURL(appStoreUrl);
      })
      .catch(err => {
        console.error('跳转到APP_STORE失败，失败原因：', err);
      });
  }
}
