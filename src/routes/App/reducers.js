import * as types from './constants';
import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import store from 'store';

// 用户信息
export function auth(state={
  isLoading: false,
  isLoaded: false,
  data: store.get('user') || null
}, action) {
  switch(action.type) {
    case types.getUserInfo:
      return handle(state, action, {
        start: (prevState) => {
          return {
            ...prevState,
            isLoading: true
          }
        },
        success: (prevState) => {
          const data = action.payload.data;
          // 保存，以备刷新页面时候，一开始就能使用
          store.set('user', data);

          return {
            ...prevState,
            isLoading: false,
            isLoaded: true,
            data: data
          };
        },
        failure: (prevState) => {
          return {
            ...prevState,
            isLoading: false,
            isLoaded: true,
            data: null
          }
        }
      });
    default:
      return state;
  }
}

export default combineReducers({
  auth
});
