import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLoginChange(evt) {
    this.setState({ email: evt.target.value });
  }

  onPasswordChange(evt) {
    this.setState({ password: evt.target.value });
  }

  onLogin() {
    const { email, password } = this.state;
    this.props.onLogin({ email, password });
  }

  render() {
    return (
      <div className="login-form">
        <input type="text" onChange={this.onLoginChange} />
        <input type="text" onChange={this.onPasswordChange} />
        <button onClick={this.onLogin}>Login</button>
      </div>
    );
  }
}
