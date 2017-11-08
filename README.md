# async-reducer, 异步注入reducer
代码再分割，异步reducer，较少体积

1. 更改`./src/reducers.js`，以便支持异步reducer
```javascript
// 更改前
export default combineReducers({
  //...
  movie,
  router: routerReducer
});
```
```javascript
// 更改后
function makeRootReducer(asyncReducers = {}) {
  return combineReducers({
    router: routerReducer,
    ...asyncReducers
  });
}
export default makeRootReducer;
```

2. 新增`./src/utils/injectReducer.js`，用于模块页面调用来注入reducer
```javascript
import makeRootReducer from './../reducers';

let injectReducer = () => {
  console.warn('must run initInjectReducer(store)');
}

/**
 * 初始化reducer注入方法，用于缓存store，避免injectReducer时候每次都要传递store
 * @param {Object} store redux store
 */
export function initInjectReducer(store) {
  return injectReducer = (key, reducer) => {
    // 若该注入的reducer已经存在，则不注入
    if (store.asyncReducers[key]) {
      return false;
    }

    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
  }
}

export default (key, reducer) => {
  injectReducer(key, reducer);
};

```
3. 更改`./src/configureStore.js`，初始化`injectReducer`，并且添加热替换配置
```javascript
// 更改前
export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

  return {
    history,
    store
  };
}
```

```javascript
// 更改后
export default function configureStore(initialState) {
  const store = createStore(makeRootReducer(), initialState, composeWithDevTools(applyMiddleware(...middlewares)));

  // 保存store，提供给inject reducer使用
  initInjectReducer(store);

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
4. 页面，注入reducer
```javascript
// ./src/routes/Movie/Index/index.js
import reducer from './reducers';

import injectReducer from './../../../utils/injectReducer';

injectReducer('movie', reducer);
```
