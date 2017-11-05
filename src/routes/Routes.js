import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import AsyncComponent from './../components/AsyncComponent';

import ApplyedRoute from './../components/route/ApplyedRoute';
import AuthRoute from './../components/route/AuthRoute';
import UnAuthRoute from './../components/route/UnAuthRoute';

export default ({ routeProps }) => {
  const AsnycFrame = AsyncComponent(() => import('./Layout/Frame'/* webpackChunkName: "layoutFrame" */));

  return (
    <Switch>
      <Redirect exact from='/' to='/movie'/>

      {/* not found */}
      <ApplyedRoute path="/404" props={ routeProps } component={ NotFound } />

      {/* auth */}
      <UnAuthRoute
       path='/login'
       props={ routeProps }
       component={ AsyncComponent(() => import('./Auth/Login/index' /* webpackChunkName: "login" */)) }
      />

      {/* layout frame */}
      <AuthRoute path='/movie' props={ routeProps } component={ AsnycFrame } />
      <AuthRoute path='/book' props={ routeProps } component={ AsnycFrame } />

      <Redirect from='*' to='/404' />
    </Switch>
  );
};
