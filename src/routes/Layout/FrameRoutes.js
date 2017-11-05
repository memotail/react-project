import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsnycComponent from './../../components/AsyncComponent';

// Frames子路有
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={AsnycComponent(() => import('./../Movie/Index'/* webpackChunkName: "movie" */))} />
      <Route exact path="/book" component={AsnycComponent(() => import('./../Book'/* webpackChunkName: "book" */))} />
      <Redirect to='/404' />
    </Switch>
  );
};
