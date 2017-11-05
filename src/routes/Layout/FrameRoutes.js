import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsyncComponent from './../../components/AsyncComponent';

// Frames子路有
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={AsyncComponent(() => import('./../Movie'/* webpackChunkName: "movie" */))} />
      <Route exact path="/book" component={AsyncComponent(() => import('./../Book'/* webpackChunkName: "book" */))} />
      <Redirect to='/404' />
    </Switch>
  );
};
