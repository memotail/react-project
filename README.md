# 自定义路由
自定义路由，用于登录状态校验等

1. 安装`store`，用于跨浏览器保存store
```
yarn add store
```
1. 在`./components/route`目录下，新建以下自定义路由
  - `AuthRoute.js`，需登录才能进入的路由
  - `UnAuthRoute.js`，登录后不能进入的路由，用于登录页等
  - `ApplyedRoute.js`，正常使用的Route，为了传递props封装，用法与Route一致
  - `NavRoute.js`，跳转路由组件，当路由一直，则高亮

2. `./src/App.js` 添加全局登录态保存、退出等函数，并传递到每个Route里面

3. `./src/routes/Auth/Login` 实现简约的登录
