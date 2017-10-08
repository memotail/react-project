import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// 需要认证后，才能进入的路由
export default ({ component: Component, props: cProps, ...rest }) =>
  <Route
    { ...rest }
    render={props => {
      return cProps.authenticated ? (
        <Component { ...props } { ...cProps } />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }}
  />;
