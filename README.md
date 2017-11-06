# 路由异步加载
代码分割，在路由切换后，按需加载模块，减少首次体积

1. 在`./src/components/` 中创建 `<Loading>、<AsnycComponent>` 用于实现异步加载模块
2. 更改`./src/routes/Routes.js`，改过componet的引入方式
```javascript
// 更改前
import Movie from './movie';
<Route path="/home" exact component={ Movie } />

// 更改后
// 其中webpackChunkName: 'movie'，是webpack把代码分割后，文件的名字定义，整站的分割文件名字必须保证唯一性
const Movie = AsyncComponent(() => import('./../Movie'/* webpackChunkName: 'movie' */));

<Route path="/home" exact component={ Movie } />
```
> 注意：不能在Route的component里面直接使用AsyncComponent，需要在Route前面常量定义，因为Router会注入到组件的render里面，render触发多次，会触发多次AsyncComponent函数，导致导入多次
