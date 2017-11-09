import React from 'react';

import FrameRoutes from './../FrameRoutes';
import { Link } from 'react-router-dom';

// import NavRoute from './../../../components/route/NavRoute';

import {
  Menu
} from 'antd';

class Frame extends React.Component {
  state = {
    current: 'movie'
  }

  onSelectMenu = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <div>
        <h1>Layout_Frame</h1>
        <Menu
          mode="horizontal"
          selectedKeys={ [this.state.current] }
          onClick={ this.onSelectMenu }
        >
          <Menu.Item key="movie"><Link to={`/movie`}>Movie</Link></Menu.Item>
          <Menu.Item key="book"><Link to={`/book`}>Book</Link></Menu.Item>
        </Menu>

        <FrameRoutes />
      </div>
    );
  }
}

export default Frame;
