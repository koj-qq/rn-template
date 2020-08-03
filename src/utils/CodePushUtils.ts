import { AppState, Alert } from 'react-native';
import codePush, { DownloadProgress } from 'react-native-code-push';

// eslint-disable-next-line complexity
const codePushStatusDidChange = async (syncStatus: codePush.SyncStatus) => {
  switch (syncStatus) {
    case codePush.SyncStatus.CHECKING_FOR_UPDATE:
      // 0 - 正在查询CodePush服务器以进行更新。
      console.info('[CodePush] Checking for update.');
      break;
    case codePush.SyncStatus.AWAITING_USER_ACTION:
      // 1 - 有可用的更新，并且向最终用户显示了一个确认对话框。（仅在updateDialog使用时适用）
      console.info('[CodePush] Awaiting user action.');
      break;
    case codePush.SyncStatus.DOWNLOADING_PACKAGE:
      // 2 - 正在从CodePush服务器下载可用更新。
      console.info('[CodePush] Downloading package.');
      break;
    case codePush.SyncStatus.INSTALLING_UPDATE:
      // 3 - 已下载一个可用的更新，并将其安装。
      console.info('[CodePush] Installing update.');
      break;
    case codePush.SyncStatus.UP_TO_DATE:
      // 4 - 应用程序已配置的部署完全最新。
      console.info('[CodePush] App is up to date.');
      break;
    case codePush.SyncStatus.UPDATE_IGNORED:
      // 5 该应用程序具有可选更新，最终用户选择忽略该更新。（仅在updateDialog使用时适用）
      console.info('[CodePush] User cancelled the update.');
      break;
    case codePush.SyncStatus.UPDATE_INSTALLED:
      // 6 - 安装了一个可用的更新，它将根据 SyncOptions 中的 InstallMode指定在 syncStatusChangedCallback 函数返回后立即或在下次应用恢复/重新启动时立即运行。
      console.info('[CodePush] Installed update.');
      break;
    case codePush.SyncStatus.SYNC_IN_PROGRESS:
      // 7 - 正在执行的 sync 操作
      console.info('[CodePush] Sync already in progress.');
      break;
    case codePush.SyncStatus.UNKNOWN_ERROR:
      // -1 - 同步操作遇到未知错误。
      console.info('[CodePush] An unknown error occurred.');
      break;
  }
};

const codePushDownloadDidProgress = (progress: DownloadProgress) => {
  const curPercent = ((progress.receivedBytes / progress.totalBytes) * 100).toFixed(0);
  console.log('[CodePushUtils] Downloading Progress', `${curPercent}%`);
  // console.log(`${progress.receivedBytes} of ${progress.totalBytes} received.`);
};

const syncImmediate = async (silent = false) => {
  if (silent) {
    codePush.sync();
  } else {
    codePush.sync(
      {
        updateDialog: {
          // 是否显示更新描述
          appendReleaseDescription: true,
          // 更新描述的前缀。 默认为"Description"
          descriptionPrefix: '\n\n更新内容：\n',
          // 强制更新按钮文字，默认为continue
          mandatoryContinueButtonLabel: '立即更新',
          // 强制更新时的信息. 默认为"An update is available that must be installed."
          mandatoryUpdateMessage: '必须更新后才能使用',
          // 非强制更新时，按钮文字,默认为"ignore"
          optionalIgnoreButtonLabel: '稍后',
          // 非强制更新时，确认按钮文字. 默认为"Install"
          optionalInstallButtonLabel: '后台更新',
          // 非强制更新时，检查到更新的消息文本
          optionalUpdateMessage: '有新版本了，是否更新？',
          // Alert窗口的标题
          title: '更新',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress
    );
  }
};

export const checkForUpdate = async () => {
  const update = await codePush.checkForUpdate();
  if (!update) {
    Alert.alert('提示', '已是最新版本');
  } else {
    syncImmediate();
  }
};

export const codePushSync = () => {
  AppState.addEventListener('change', newState => {
    newState === 'active' && syncImmediate(true);
  });
};
