# ant-design

添加UI框架，加速开发效率

1. 安装 `antd` 、 `babel-plugin-import`
```
yarn add antd
yarn add babel-plugin-import --dev
```
2. 设置babel配置，`babel-plugin-import` 会按需加载 JS 和 CSS，避免全部注入
```
  // 更改前
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "babel-plugin-transform-decorators-legacy"
    ]
  }
```
```javascript
  // 更改后
  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "babel-plugin-transform-decorators-legacy",
      [
        "import",
        {
          "libraryName": "antd",
          "style": true     // true: 注入less；"css": 则注入css，这里注入less有利于后续自定义主题
        }
      ]
    ]
  }
```
3. 安装`less`、`less-loader`，配置webpack文件，支持less
```
yarn add less less-loader
```

```javascript
// ./config/webpack.config.dev.js
// 将module css中的postcss配置复制到文件前面，命名为postcssConfig，以便module.less也使用
{
  test: /\.less$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    postcssConfig,
    {
      loader:'less-loader'
    }
  ]
},

// 同理./config/webpack.config.prod.js也需要跳转
// ...略
```

4. 在页面中使用ant-design组件渲染页面(略)
