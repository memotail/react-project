import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        password: ''
      }
    };
  }

  changeField = (e) => {
    this.setState({
      isFetching: false,
      redirectToReferrer: false,
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value.trim()
      }
    });
  }

  validate() {
    return this.state.user.name.length > 0 && this.state.user.password.length > 0;
  }

  submit = (e) => {
    e.preventDefault();

    this.setState({
      isFetching: true
    });

    // 模拟登录行为
    setTimeout(() => {
      // 登录成功，则调用获取用户信息
      this.props.getUserInfo(this.state.user);
    }, 300);
  }

  render() {
    const {
      user,
      isFetching
    } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.submit }>
          <div>
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="用户名"
              value={ user.name }
              onChange={ this.changeField }
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="密码"
              value={ user.password }
              onChange={ this.changeField }
            />
          </div>
          <div>
            <button disabled={ !this.validate() || isFetching }>
              { isFetching ? '登录中...' : '登录' }
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
