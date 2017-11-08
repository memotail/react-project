# 一步一步搭建React项目

现在各种React手脚架，对React入门带来极大的方便。但直接拿来也会有些问题，如：

1. 代码版本不够新
2. 所需的插件不包含
3. 业务定制化
4. 整个全家桶等的关联不是很熟悉
5. ...等等

因此，自己从头搭建很有必要

从简单的手脚架一步一步搭建，达到对整个React架构的认识。


#### 步骤
- [x] 1. [create-react-app](https://github.com/memotail/react-project/tree/create-react-app) 通过官方手脚架开始，自定义webpack配置，已达到自身要求
- [x] 2. [hot-replace](https://github.com/memotail/react-project/tree/hot-replace) 为项目提供热替换能力，避免刷新视图
- [x] 3. [react-router](https://github.com/memotail/react-project/tree/react-router) 添加路由
- [x] 4. [code-splitting](https://github.com/memotail/react-project/tree/code-splitting) 代码分割，在路由切换后，按需加载模块，减少首次体积
- [x] 5. [custom-router](https://github.com/memotail/react-project/tree/custom-router) 自定义路由，用于登录状态校验等
- [x] 6. [redux](https://github.com/memotail/react-project/tree/redux) 初始化redux配置，使用redux做状态管理
- [x] 7. [redux-fetch](https://github.com/memotail/react-project/tree/redux-fetch) 添加异步请求，完成从redux到react的数据传递
- [x] 8. [async-reducer](https://github.com/memotail/react-project/tree/async-reducer) 代码再分割，异步reducer，较少体积
- [x] 9. [global-redux](https://github.com/memotail/react-project/tree/global-redux) 通过redux存储全局app状态，将获取用户信息、退出登录等使用redux管理
- [ ] 10. [reset-redux](https://github.com/memotail/react-project/tree/reset-redux), 退出登录，重置reducer，避免账号切换后遗留之前的数据
- [ ] 11. styled-component，样式美化
- [ ] 12. douban, 豆瓣PC页面模拟
- [ ] 13. i18n，国际化配置，适配多语言
- [ ] 14. react-media，视图分离，进行深层次的响应式
- [ ] 15. douban-mobile，豆瓣移动端页面模拟
- [ ] 16. ...(待续)

#### 用法
clone该仓库，并安装npm依赖包

```
git clone https://github.com/memotail/react-project.git
```
```
npm install
```
启动开发服务器
```
npm start
```
