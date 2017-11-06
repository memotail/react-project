# react-router
添加路由

1. 安装`react-router`、`react-router-dom`
```
yarn add react-router react-router-dom
```
2. 构建routes目录，构建Layout、404等页面，以及`Routes.js`路由总入口
  - `Auth` 存放登录等权限类页面
  - `Layout` 布局类页面入口，用于公共顶部、导航等，注入业务子路由
    - `Frame` 基本布局
    - `FrameRoutes.js` 基本布局的子路由配置文件
  - `Book`、`Movie` 业务页面，后续每个模块为一类
  - `NoFound` 404页面
  - `Routes.js` 路由总入口
3. 配置路由
```
import { withRouter } from 'react-router-dom';
import Routes from './routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
```

### 4. 路由异步加载
1. 在`./src/components/` 中创建 `<Loading>、<AsnycComponent>` 用于实现异步加载模块
2. 更改`./src/routes/Routes.js`，改过componet的引入方式
```
// 更改前
import Movie from './movie';
<Route path="/home" exact component={ Movie } />

// 更改后
const Movie = AsyncComponent(() => import('./../Movie'/* webpackChunkName: 'movie' */));

<Route path="/home" exact component={ Movie } />
// 其中webpackChunkName: 'movie'，是webpack把代码分割后，文件的名字定义，整站的分割文件名字必须保证唯一性

```
> 注意：不能在Route的component里面直接使用AsyncComponent，需要在Route前面常量定义，因为Router会注入到组件的render里面，render触发多次，会触发多次AsyncComponent函数，导致导入多次
