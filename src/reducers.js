import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './routes/App/reducers';
import * as appTypes from './routes/App/constants';

let _store;

// 若退出登录，则重置所有state
function resetReducer(rootReducer) {
  return (state, action) => {
    if (action.type === appTypes.logout) {
      // state为空对象，导致所有reducer的state为null，会导致使用默认state
      state = {};
    }

    return rootReducer(state, action);
  }
};

// 根reducer
function rootReducer(asyncReducers = {}) {
  return combineReducers({
    app,
    router: routerReducer,
    ...asyncReducers
  });
}

// 构建reducer树
function makeRootReducer(asyncReducers) {
  return resetReducer(rootReducer(asyncReducers));
}

// 在configureStore中，调用保存，用于后续异步注入reducer免得传递store
export function saveStore(store) {
  _store = store;
}

export function injectReducer(key, reducer) {
  // 若该注入的reducer已经存在，则不注入
  if (_store.asyncReducers[key]) {
    return false;
  }

  _store.asyncReducers[key] = reducer;
  _store.replaceReducer(makeRootReducer(_store.asyncReducers));
}

export default makeRootReducer;
