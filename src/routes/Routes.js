import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import AsnycComponent from './../components/AsyncComponent';

import ApplyedRoute from './../components/route/ApplyedRoute';
import AuthRoute from './../components/route/AuthRoute';
import UnAuthRoute from './../components/route/UnAuthRoute';

export default ({ routeProps }) => {
  return (
    <Switch>
      <Redirect exact from='/' to='/home' props={ routeProps } />

      {/* home */}
      <AuthRoute
        path='/home/cat/detail/:id'
        props={ routeProps }
        component={ AsnycComponent(() => import('./Home/Cat/detail' /* webpackChunkName: "catDetail" */)) }
      />
      <AuthRoute
        path='/home/cat'
        props={ routeProps }
        component={ AsnycComponent(() => import('./Home/Cat/index' /* webpackChunkName: "cat" */)) }
      />
      <AuthRoute
        path='/home/dog'
        props={ routeProps }
        component={ AsnycComponent(() => import('./Home/Dog/index' /* webpackChunkName: "dog" */)) }
      />
      <AuthRoute
        path='/home'
        props={ routeProps }
        component={ AsnycComponent(() => import('./Home/index' /* webpackChunkName: "home" */)) }
      />

      {/* auth */}
      <UnAuthRoute
       path='/login'
       props={ routeProps }
       component={ AsnycComponent(() => import('./Auth/Login/index' /* webpackChunkName: "login" */)) }
      />
      <UnAuthRoute
       path='/register'
       props={ routeProps }
       component={ AsnycComponent(() => import('./Auth/Register/index' /* webpackChunkName: "register" */)) }
      />

      {/* not found */}
      <ApplyedRoute props={ routeProps } component={ NotFound } />
    </Switch>
  );
};
