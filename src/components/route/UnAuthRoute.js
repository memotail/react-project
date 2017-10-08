import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// 未认证情况下，能进入的路由
export default ({ component: Component, props: cProps, ...rest }) =>
  <Route
    { ...rest }
    render={props => {
      if (cProps.authenticated) {
        const state = rest.location.state || { from: { pathname: '/' } };

        return (
          <Redirect to={ state.from } />
        );
      }

      return (
        <Component { ...props } { ...cProps } />
      );
    }}
  />;
