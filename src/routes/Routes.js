import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

import Home from './Home/index';
import Cat from './Home/Cat/index';
import CatDetail from './Home/Cat/detail';
import Dog from './Home/Dog/index';

import Login from './Auth/Login/index';
import Register from './Auth/Register/index';

export default () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/home'/>

      {/* home */}
      <Route path='/home/cat/detail/:id' exact component={ CatDetail } />
      <Route path='/home/cat' exact component={ Cat } />
      <Route path='/home/dog' exact component={ Dog } />
      <Route path='/home' exact component={ Home } />

      {/* auth */}
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />

      {/* not found */}
      <Route component={ NotFound }  />
    </Switch>
  );
};
