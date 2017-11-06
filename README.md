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
