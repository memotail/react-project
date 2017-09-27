import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withRouter, Link } from 'react-router-dom';
import Routes from './routes/Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Project</h2>
        </div>
        <ul>
          <li><Link to={ '/' }>Home</Link></li>
          <li><Link to={ '/login' }>Login</Link></li>
          <li><Link to={ '/test' }>404 /test</Link></li>
        </ul>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
