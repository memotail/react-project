import * as types from './constants';
import { handle } from 'redux-pack';

function reducer(state={
  isLoading: false,
  isLoaded: false,
  data: {}
}, action) {
  switch(action.type) {
    // 加载正在上映的电影列表
    case types.loadMovieTheaters:
      return handle(state, action, {
        start: (prevState) => {
          return {
            ...prevState,
            isLoading: true
          };
        },
        success: (prevState) => {
          return {
            ...prevState,
            isLoading: false,
            isLoaded: true,
            data: action.payload
          };
        },
        failure: (prevState) => {
          return {
            ...prevState,
            isLoading: false,
            isLoaded: true,
            error: action.payload
          };
        }
      });
    default:
      return state;
  }
}

export default reducer;
