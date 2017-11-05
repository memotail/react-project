import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsyncComponent from './../../components/AsyncComponent';
import { injectReducer } from './../../reducers';

// Frames子路有
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={AsyncComponent(() =>
        Promise.all([
          import('./../Movie/Index'/* webpackChunkName: "movie" */),
          import('./../Movie/Index/reducers'/* webpackChunkName: "movieReducers" */)
        ]).then(([component, reducer]) => {
          // 异步加载完模块时候，注入reducers
          injectReducer('movie', reducer.default);

          // 返回component，AsyncComponent异步后，需要渲染component
          return component;
        })
      )} />
      <Route exact path="/book" component={AsyncComponent(() => import('./../Book'/* webpackChunkName: "book" */))} />
      <Redirect to='/404' />
    </Switch>
  );
};
