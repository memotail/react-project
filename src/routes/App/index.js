import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from './actions';

import { withRouter } from 'react-router-dom';
import Routes from './../Routes';

@withRouter
@connect(
  (state) => state.app,
  (dispatch) => bindActionCreators(appActions, dispatch)
)
class App extends Component {
  componentDidMount() {
    // 获取用户信息判断
    this.props.getUserInfo();
  }

  logout = () => {
    this.props.logout();
  }

  render() {
    const {
      auth,
      getUserInfo
    } = this.props;

    if (auth.isLoading) {
      return (
        <div>获取用户信息...</div>
      );
    }

    const authenticated = !!auth.data;

    // 提供给route使用的参数
    const routeProps = {
      authenticated,
      getUserInfo
    };

    return (
      <div className="app">
        {
          authenticated ? (
            <div>
              你好，{ auth.data.name } <button onClick={ this.logout }>退出登录</button>
            </div>
          ) : null
        }
        <Routes routeProps={ routeProps } />
      </div>
    );
  }
}

export default App;
