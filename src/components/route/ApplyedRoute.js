import React from 'react';
import { Route } from 'react-router-dom';

// 与Route使用一致，只为了方便传递props
export default ({ component: Component, props: cProps, ...rest }) =>
  <Route
    { ...rest }
    render={props =>
      <Component {...props} {...cProps} />
    }
  />;
