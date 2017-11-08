import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './routes/App/reducers';

function makeRootReducer(asyncReducers = {}) {
  return combineReducers({
    app,
    router: routerReducer,
    ...asyncReducers
  });
}

export default makeRootReducer;
