import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const history = createHistory();

// 中间件集合
const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];

// 开发环境，添加开发中间件
if(process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

  return {
    history,
    store
  };
}
