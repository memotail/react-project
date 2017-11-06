# 使用官方手脚架create-react-app
通过官方手脚架开始，自定义webpack配置，已达到自身要求

1. 安装`create-react-app`
```
yarn add -g create-react-app
```

2. 执行create-react-app，生成名称为 `react-project` 的项目
```
create-react-app react-project
```
> 创建项目，会自动执行依赖包的安装，需要等待。

3. 进入项目，然后执行释放`create-react-app`配置
```
cd react-project
yarn run eject   // 提示输入 'y'
```
> 由于`create-react-app`生成的项目中，webpack配置文件是隐藏在`react-script`包里面的，所以需要通过`npm run eject`来释放到外面，这样才能自定义配置

4. 安装`cross-env`，处理npm script 不同平台（mac/window）传递参数问题，并启用https
```
yarn add cross-env --dev

// ./package.json
// 修改前
"start": "node scripts/start.js",

// 修改后
"start": "cross-env HTTPS=true node scripts/start.js",
```

5. 启动开发服务器
```
yarn start
```
