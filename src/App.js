import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import Routes from './routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
