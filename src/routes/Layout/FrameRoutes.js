import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsyncComponent from './../../components/AsyncComponent';

const book = AsyncComponent(() => import('./../Movie'/* webpackChunkName: "movie" */));
const movie = AsyncComponent(() => import('./../Book'/* webpackChunkName: "book" */));

// Frames子路有
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={movie} />
      <Route exact path="/book" component={book} />
      <Redirect to="/404" />
    </Switch>
  );
};
