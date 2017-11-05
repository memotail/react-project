import React from 'react';

import FrameRoutes from './../FrameRoutes';

import NavRoute from './../../../components/route/NavRoute';

class Frame extends React.Component {
  render() {
    return (
      <div>
        <h1>Layout_Frame</h1>

        <NavRoute to={`/movie`}>Movie</NavRoute> | <NavRoute to={`/book`}>Book</NavRoute>

        <FrameRoutes />
      </div>
    );
  }
}

export default Frame;
