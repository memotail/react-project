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
