import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import AsyncComponent from './../components/AsyncComponent';

const AsnycFrame = AsyncComponent(() => import('./Layout/Frame'/* webpackChunkName: "layoutFrame" */));
const Login = AsyncComponent(() => import('./Auth/Login'/* webpackChunkName: "login" */))

export default () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/movie"/>

      {/* not found */}
      <Route path="/404" component={ NotFound } />

      {/* auth */}
      <Route path="/login" component={ Login } />

      {/* layout frame */}
      <Route path="/movie" component={ AsnycFrame } />
      <Route path="/book" component={ AsnycFrame } />

      <Redirect from="*" to="/404" />
    </Switch>
  );
};
