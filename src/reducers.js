import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import movie from './routes/Movie/Index/reducers';

export default combineReducers({
  //...
  movie,
  router: routerReducer
});
