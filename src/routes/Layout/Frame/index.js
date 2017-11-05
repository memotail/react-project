import React from 'react';
import { Link } from 'react-router-dom';

import FrameRoutes from './../FrameRoutes';

class Frame extends React.Component {
  render() {
    return (
      <div>
        <h1>Layout_Frame</h1>
        <Link to={`/movie`}>Movie</Link> | <Link to={`/book`}>Book</Link>

        <FrameRoutes />
      </div>
    );
  }
}

export default Frame;
