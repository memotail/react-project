import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home/index';
import Login from './Login/index';
import NotFound from './NotFound/index';

export default () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/home'/>
      <Route path='/home' component={ Home }  />
      <Route path='/login' component={ Login } />
      <Route component={ NotFound }  />
    </Switch>
  );
};
