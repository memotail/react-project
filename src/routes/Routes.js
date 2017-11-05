import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound/index';

// import Home from './Home/index';
// import Cat from './Home/Cat/index';
// import CatDetail from './Home/Cat/detail';
// import Dog from './Home/Dog/index';

import Frame from './Layout/Frame';

import Login from './Auth/Login/index';

export default () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/movie'/>

      {/* not found */}
      <Route path="/404" component={ NotFound } />

      {/* auth */}
      <Route path='/login' component={ Login } />

      {/* layout frame */}
      <Route path='/movie' component={ Frame } />
      <Route path='/book' component={ Frame } />

      <Redirect from='*' to='/404' />
    </Switch>
  );
};
