import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import AsnycComponent from './../components/AsyncComponent';

export default () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/home'/>

      {/* home */}
      <Route path='/home/cat/detail/:id' exact component={ AsnycComponent(() => import(/* webpackChunkName: "catDetail" */'./Home/Cat/detail')) } />
      <Route path='/home/cat' exact component={ AsnycComponent(() => import(/* webpackChunkName: "cat" */'./Home/Cat/index')) } />
      <Route path='/home/dog' exact component={ AsnycComponent(() => import(/* webpackChunkName: "dog" */'./Home/Dog/index')) } />
      <Route path='/home' exact component={ AsnycComponent(() => import(/* webpackChunkName: "home" */'./Home/index')) } />

      {/* auth */}
      <Route path='/login' component={ AsnycComponent(() => import(/* webpackChunkName: "login" */'./Auth/Login/index')) } />
      <Route path='/register' component={ AsnycComponent(() => import(/* webpackChunkName: "register" */'./Auth/Register/index')) } />

      {/* not found */}
      <Route component={ NotFound }  />
    </Switch>
  );
};
