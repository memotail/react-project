import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsyncComponent from './../../components/AsyncComponent';
import { injectReducer } from './../../reducers';

const Movie = AsyncComponent(() =>
  Promise.all([
    import('./../Movie/Index'/* webpackChunkName: "movie" */),
    import('./../Movie/Index/reducers'/* webpackChunkName: "movieReducers" */)
  ]).then(([component, reducer]) => {
    // 异步加载完模块时候，注入reducers
    injectReducer('movie', reducer.default);

    // 返回component，AsyncComponent异步后，需要渲染component
    return component;
  })
);

const Book = AsyncComponent(() => import('./../Book'/* webpackChunkName: "book" */));

const Movie = AsyncComponent(() => import('./../Movie/Index'/* webpackChunkName: "movie" */));
const Book = AsyncComponent(() => import('./../Book'/* webpackChunkName: "book" */));

// Frames子路有
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={ Movie } />
      <Route exact path="/book" component={ Book } />
      <Redirect to="/404" />
    </Switch>
  );
};
