import React from 'react';
import { Route } from 'react-router-dom';

import Login from './../Login/index';

export default ({ match }) => {
  return (
    <div>
      <Route path={ `${match.url}/test` } component={ Login } />
    </div>
  );
};
