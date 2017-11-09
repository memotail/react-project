# 更改ant-design默认样式

1. 安装`less-vars-to-js`
```
yarn add less-vars-to-js --dev
```

2. 新建`./src/theme`目录，以及以下文件
    - `config.js`   用于ant-design部分组件通过脚本更改的位置
    - `default.less`    重置less变量
    - `index.less`      重写css样式，通过less变量更改达不到需求的css，在这里重载
    - `modifyVars.js`   读取`default.less`，将css变量转为js，提供给webpack使用

3. app入口文件`./index.js` 中导入重载的css以及配置
```javascript
// 重载css
import './theme/index.less'
import './theme/config';
```

4. 更改`./package.json`，添加theme路径设置，让webpack读取`package.json`来读取变量更改
```javascript
"theme": "./src/theme/modifyVars.js"
```

5. 更改`./config/webpack.config.dev.js`以及`./config/webpack.config.prod.js`配置，将theme的变量提供给`less-loader`
```javascript
// 1. 读取package.json文件，获取theme字段，得到变量配置文件地址"./src/theme/modifyVars.js"
// 2. 运行配置文件，得到变量对象
// 3. 也可以在package.json编写配置对象

const fs = require('fs');

// import theme
const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};

if (pkg.theme && typeof(pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  // relative path
  if (cfgPath.charAt(0) === '.') {
    cfgPath = path.resolve(process.cwd(), cfgPath);
  }

  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
  theme = pkg.theme;
}
```

```javascript
// 将主题变量对象，提供给less-loader的options.modifyVars使用，让less-loader在编译ant-design时候，使用新的变量

// 更改前
{
  loader:'less-loader'
}

// 更改后
{
  loader:'less-loader',
  options: {
    modifyVars: theme
  }
}
```
