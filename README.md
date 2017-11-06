# 添加热替换
为项目提供热替换能力，避免刷新视图

1. 安装`react-hot-loader` v3版本
```
yarn install react-hot-loader@next
```
2. 添加热替换注入到webpack 打包的entry里面
```jsx
// config/webpack.config.dev.js
// entry 配置里面

// hot replace
require.resolve('react-hot-loader/patch'),
```
3. `./src/index.js`添加热替换代码
```jsx
// ./src/index.js
// render设为一个函数，通过module.hot来判断进行重新render App模块，达到热替换

import { AppContainer } from 'react-hot-loader';

const render = Component => {
  if (document.getElementById('root')) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root')
    );
  }
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

```
