import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import AsnycComponent from './../components/AsyncComponent';

export default () => {
  const AsnycFrame = AsnycComponent(() => import('./Layout/Frame'/* webpackChunkName: "layoutFrame" */));

  return (
    <Switch>
      <Redirect exact from='/' to='/movie'/>

      {/* not found */}
      <Route path="/404" component={ NotFound } />

      {/* auth */}
      <Route path='/login' component={ AsnycComponent(() => import('./Auth/Login'/* webpackChunkName: "login" */)) } />

      {/* layout frame */}
      <Route path='/movie' component={ AsnycFrame } />
      <Route path='/book' component={ AsnycFrame } />

      <Redirect from='*' to='/404' />
    </Switch>
  );
};
