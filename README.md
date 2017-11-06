#async-reducer, 异步注入reducer
代码再分割，异步reducer，较少体积

1. 更改`./src/reducers.js`, 添加`injectReducer`函数以及`saveStore`，以便调用`replaceReducer`进行注入reducer
```javascript
// ./src/reducers.js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

let _store;

function makeRootReducer(asyncReducers) {
  return combineReducers({
    router: routerReducer,
    ...asyncReducers
  });
}

// 在configureStore中，调用保存，用于后续异步注入reducer免得传递store
export function saveStore(store) {
  _store = store;
}

export function injectReducer(key, reducer) {
  // 若该注入的reducer已经存在，则不注入
  if (asyncReducers[key]) {
    return false;
  }

  asyncReducers[key] = reducer;
  _store.replaceReducer(makeRootReducer(_store.asyncReducers));
}

export default makeRootReducer;
```

2. 更改`./src/configureStore.js`，调用`saveStore`来保存store，并且添加热替换配置
```javascript
// ./src/configureStore.js
// ... 省略前面代码

export default function configureStore(initialState) {
  const store = createStore(makeRootReducer(), initialState, composeWithDevTools(applyMiddleware(...middlewares)));

  // 保存store，提供给inject reducer使用
  saveStore(store);

  // 异步reducers集合
  store.asyncReducers = {};

  // 若reducer更改，则热替换
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    });
  }

  return {
    history,
    store
  };
}
```
3. 更改路由动态注入模块方式，更改为支持reducer注入
```javascript
// ./src/routes/Layout/FrameRoutes.js

// 更改前
const Movie = AsyncComponent(() => import('./../Movie/Index'/* webpackChunkName: "movie" */)};

// 更改后
import { injectReducer } from './../../reducers';

const Movie = AsyncComponent(() =>
  Promise.all([
    import('./../Movie/Index'/* webpackChunkName: "movie" */),
    import('./../Movie/Index/reducers'/* webpackChunkName: "movieReducers" */)
  ]).then(([component, reducer]) => {
    // 异步加载完模块时候，注入reducers
    injectReducer('movie', reducer.default);

    // 返回component，AsyncComponent异步后，需要渲染component
    return component;
  })
);
```
