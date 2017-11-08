import * as types from './constants';
import store from 'store';
// import api from './../../utils/api';

function mock(data, delay=200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        data
      });
    }, delay);
  });
}

// 获取用户信息
export function getUserInfo(user) {
  return {
    type: types.getUserInfo,
    promise: mock(user || store.get('user') || null)
  }
}

// 退出登录
export function logout() {
  return {
    type: types.logout,
    promise: mock().then((response) => {
      // 删掉用户信息存储
      store.remove('user');

      return response;
    })
  }
}
