# 模板配置步骤介绍
**此模板基于react-native@0.62.2版本。**
- 根据公司项目开发规范，内置了TypeScript、Eslint、Prettier、Git hooks、commit规范。
- 根据公司项目特点，内置了热更新、极光推送、支付功能、文件操作、Sentry、图表等功能。

## 1. 热更新配置
使用命令`code-push deployment list <appName> -k`查看热更新服务器上创建的应用的Deployement Key
### 1.1 安卓配置
打开`android/app/build.gradle`，检索`CodePushDeploymentKey`，复制`Staging`的DeploymentKey到`debug`和`releaseStaging`；复制`Production`的DeploymentKey到`release`
### 1.2 IOS配置
打开xcode下`PROJECT` -> `BuildSettings`的Tab，拉到最下面，看到有一个`CODEPUSH_KEY`的配置，复制`Staging`的DeploymentKey到`debug`和`staging`；复制`Production`的DeploymentKey到`release`

## 2. 极光推送配置
在[极光推送]('https://www.jiguang.cn/')官网 -> 应用管理 -> 创建应用，把相关的配置配置好。
![jiguang](md-images/jiguang.png)
复制这里的AppKey和MasterSecret
### 2.1 安卓配置
打开`android/app/build.gradle`，检索`JPUSH_APPKEY`值为AppKey; `JPUSH_CHANNEL`值可以自定义（建议以项目名命名）
### 2.2 IOS配置
打开`AppDelegate.m`文件，找到下面这行代码：
```code
// JPush初始化配置
  [JPUSHService setupWithOption:launchOptions appKey:@"129c21dc4cb5e6f6de194003"
                        channel:@"dev" apsForProduction:YES];
```

把这里的appKey替换为你的应用的AppKey。

## 3. 支付功能配置

### 3.1 支付宝支付配置
#### 3.1.1 安卓配置
不需要额外配置
#### 3.1.2 IOS配置
打开xcode，选择`TARGETS` -> `Info` -> `URL Types`，找到`alipay`，修改`URL Schemes`为`ap${支付宝开放平台里面新建的appId}`

### 3.2 微信支付配置
打开根目录下的`index.js`，找到`Wechat.registerApp`的代码，
这里的参数分别为微信开放平台里面新建的appId以及微信开放平台里面的回调域。

**注意：这里的第二个参数必须和微信开放平台里面的回调域保持一致，否则支付后IOS无法从微信返回APP**
#### 3.2.1 安卓配置
不需要额外配置
#### 3.2.2 IOS配置
打开xcode，选择`TARGETS` -> `Info` -> `URL Types`，找到`weixin`，修改`URL Schemes`为`${微信开放平台里面新建的appId}`

## 4. Sentry配置
打开根目录下的`index.js`文件，找到下面这段代码：
```js
Sentry.init({
  dsn: 'http://4c9a0f835f344d90893218817dfcc8e2:e76c3632f21944fbb40964477e432d66@192.168.0.201:29177/9',
  // 监控运行状况
  enableAutoSessionTracking: true,
  // Sessions close after app is 10 seconds in the background.
  sessionTrackingIntervalMillis: 10000,
});
```
根据自己的项目修改这里的`dsn`
### 4.1 安卓配置
打开`android`目录下的`sentry.properties`文件进行修改
### 4.2 IOS配置
打开`ios`目录下的`sentry.properties`文件进行修改

## 5. app图标和启动页替换
访问[App Icon Maker]('https://appiconmaker.co/')，根据UI设计师提供的1024*1024的logo生成ios和安卓的各种尺寸的logo
### 5.1 安卓配置
#### 5.1.1 APP图标替换
因为安卓同时也支持圆角图标，所以建议让UI设计师也提供一个圆角的logo
打开`android/app/src/main/res/`，以`mipmap-`开头的文件夹下存放的就是app图标了，只需要把我们的图标按照对应的映射关系放到正确的文件夹下就可以了。
具体映射关系如下：
- hdpi: 72*72
- mdpi: 48*48
- xhdpi: 96*96
- xxhdpi: 144*144
- xxxhdpi: 192*192
#### 5.1.2 启动页替换
打开`android/app/src/main/res/drawable`，这个文件夹存放的就是启动页的图片了。
### 5.2 IOS配置
#### 5.2.1 APP图标替换
打开xcode，项目目录下选择`Images.xcassets`，然后选择`AppIcon`，打开的就是ios的启动图标了。
只需要把我们上面生成的ios图标按照对应的映射关系进行替换就可以了。
具体的映射关系如下：
![ios-icon](md-images/ios-icon.png)
#### 5.2.2 启动页替换
![ios-launch](md-images/ios-launch.png)