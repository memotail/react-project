import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AsyncComponent from './../../components/AsyncComponent';

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
