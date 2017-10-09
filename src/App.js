import React, { Component } from 'react';
import store from 'store';
import logo from './logo.svg';
import './App.css';

import { withRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import NavRoute from './components/route/NavRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticating: true, // 是否是认证进行中
      authenticated: false  // 是否已认证
    };
  }

  async componentDidMount() {
    // 登录判断
    try {
      const user = await this.getUserInfo();

      if (user) {
        this.setAuthenticated(user);
      } else {
        console.warn('miss user info');
      }
    } catch (e) {
      console.warn(e);
    }

    this.setState({
      authenticating: false
    });
  }

  getUserInfo() {
    // 模拟异步获取用户状态
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = store.get('user');
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      }, 300);
    });
  }

  // 已登录设置
  setAuthenticated = (status = false) => {
    this.setState({
      authenticated: status
    });
  }

  logout = () => {
    store.remove('user');

    this.setState({
      authenticated: false
    });
  }

  render() {
    if (this.state.authenticating) {
      return (
        <div>获取登录信息...</div>
      );
    }

    // 提供给route使用的参数
    const routeProps = {
      authenticated: this.state.authenticated,
      setAuthenticated: this.setAuthenticated
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Project</h2>
        </div>
        {
          this.state.authenticated ? (
            <button onClick={ this.logout }>退出登录</button>
          ) : null
        }
        <div>
          <NavRoute to="/home">home</NavRoute>&nbsp;&nbsp;
          <NavRoute to="/login">login</NavRoute>&nbsp;&nbsp;
          <NavRoute to="/home/cat">home/cat</NavRoute>&nbsp;&nbsp;
          <NavRoute to="/home/dog">home/dog</NavRoute>&nbsp;&nbsp;
        </div>
        <Routes routeProps={ routeProps } />
      </div>
    );
  }
}

export default withRouter(App);
