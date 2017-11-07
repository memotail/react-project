import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './routes/App/reducers';

let _store;

function makeRootReducer(asyncReducers) {
  return combineReducers({
    app,
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
  if (_store.asyncReducers[key]) {
    return false;
  }

  _store.asyncReducers[key] = reducer;
  _store.replaceReducer(makeRootReducer(_store.asyncReducers));
}

export default makeRootReducer;
