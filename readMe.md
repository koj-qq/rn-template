## 如何将 png 转成 webp

执行 assets 下的`cwebp.sh`:

```code
cd assets/
sh ./cwebp.sh
```

## 新的项目结构

按照 `DDD（领域驱动设计）`的理念，应该将一个应用按照不同的领域拆分成不同的模块（module），模块与模块之间是相互隔离的。一个模块内可以有多个功能。功能通常由 4 部分组成：UI、样式（css）、逻辑（service）、测试（UI 测试、逻辑测试）。如下图所示： ![结构图](https://pic1.zhimg.com/80/v2-fb4f17255b77db6d0151aadae6140830_720w.jpg)

- `Auth` 负责登录验证
- `Router` 负责视图再组织
- `TodoList` 一个独立的 TodoList 功能领域

几大领域功能全部隔离，Auth 的相关逻辑不需要再其他组件进行变更。每个领域下的功能都会扩展，比如 Auth 下除了登录，还会有注册、忘记密码、修改密码等功能。

我们来单看某个功能，比如`Login`：

1. UI 部分：

![登录表单](https://pic4.zhimg.com/80/v2-d173bc828f2067b7166984ca680d4453_720w.jpg)

观察可以发现，这个 UI 组件，除了依赖注入了`userLoginFormService`之外，不包含任何逻辑和状态。

2. 逻辑部分：

![登录表单逻辑](https://pic2.zhimg.com/80/v2-05483258f1b329f09f28c7f3bdebd755_720w.jpg)

这个逻辑有以下几种内容构成：

- 需要的一些服务，通过`useContext`注入。比如：

```js
const authService = useContext(AuthService);
```

- 登录功能的实现逻辑
- 需要变更的上下文数据，比如：

```js
authService.saveToken(res.token);
authService.saveUserInfo(res.userInfo);
```

通过上面的例子，我们再次认识到一个最大的好处，就是功能领域结构的边界足够清晰。如上，所有跟验证相关的代码，只有可能在`Auth`中，所有跟登录相关的代码，只有可能在`Login`中，所有跟登录表单相关的代码，只有可能在`LoginForm`中。

**我们通过这样的划分，就可以形成非常好的团队协作。每个人可以负责一个独立的模块，或者某几个人组成一个开发小组，负责某一个模块，每个人负责这个模块下的某一个功能。功能或者模块的外部依赖都通过注入的方式获取，可以大大降低项目的维护成本。**

再有一点好处就是非常方便测试。UI 需要测试吗？不需要，因为没有逻辑。只需要一个 snapshot 就足够判断组件的变动是否符合预期，我们只需要测试逻辑部分。逻辑部分因为是 hooks，有专门的工具来帮助我们快速进行测试和模拟（详见`hooks`目录下的测试用例）。这样我们就可以有足够的自信保证逻辑的正确性。

## 如何集成`Sentry`

1. 安装依赖

```code
yarn add @sentry/react-native
```

2. 安装原生支持

```code
yarn sentry-wizard -i reactNative -p ios android
```

3. 修改`index.js`

```js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://8c9688d0437a4923a890211af203e69c@o503055.ingest.sentry.io/5587668', // 替换成你自己的
});
```

4. 验证

- 抛异常验证：

```js
<Button title="click" onPress={() => {
  throw new Error("My First Sentry error!");
}}>
```

- Sentry 捕获异常

```js
<Button title="click" onPress={() => {
  Sentry.captureException(new Error('My Second Sentry error!'));
}}>
```

- 自定义 Tag 和额外参数

```js
<Button title="click" onPress={() => {
  Sentry.withScope(scope => {
    scope.setTag('tag', 'custom');
    scope.setExtras({
      // ...
    });
    Sentry.captureException(new Error('My Third Sentry error!'));
  })
}}>
```

_`pod install` 如果失败，请先执行`pod repo update`_
