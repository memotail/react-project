import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';

import makeRootReducer, { saveStore } from './reducers';

const history = createHistory();

// 中间件集合
const historyMiddleware = routerMiddleware(history);
const middlewares = [thunk, historyMiddleware, reduxPackMiddleware];

// 开发环境，添加开发中间件
if(process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

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
