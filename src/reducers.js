import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './routes/App/reducers';
import * as appTypes from './routes/App/constants';

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

export default makeRootReducer;
