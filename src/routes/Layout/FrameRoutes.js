import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Movie from './../Movie';
import Book from './../Book';

// Frames子路由
export default ({ routeProps }) => {
  return (
    <Switch>
      <Route exact path="/movie" component={ Movie } />
      <Route exact path="/book" component={ Book } />
      <Redirect to="/404" />
    </Switch>
  );
};
