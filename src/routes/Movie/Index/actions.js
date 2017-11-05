import * as types from './constants';
import api from './../../../utils/api';

// 加载最近上映的电影
export function loadMovieTheaters() {
  return {
    type: types.loadMovieTheaters,
    promise: api.get('/proxy/douban/v2/movie/in_theaters')
  };
}
