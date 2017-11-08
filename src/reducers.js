import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function makeRootReducer(asyncReducers = {}) {
  return combineReducers({
    router: routerReducer,
    ...asyncReducers
  });
}

export default makeRootReducer;
