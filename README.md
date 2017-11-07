# app公共redux管理
通过redux存储全局app状态，将获取用户信息、退出登录等使用redux管理

1. 将`./src/App.js` 迁移到 `./src/routes/App/index.js`
2. 在`./src/routes/App/`下，添加`constant.js`、`actions.js`、`reducers.js`
    1. 未来全局事件，在该`actions.js`实现
    2. 用户的状态，在redux的`state.app`里面管理，如：用户信息`state.app.auth`、消息`state.app.message`。
3. 将`./src/routes/App/reducers.js`，注入到全局的`./src/reducers.js`里面
4. `./src/routes/App/index.js` 的获取用户信息以及退出登录，使用redux方式实现
