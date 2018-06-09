import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../redux/auth/auth.actions';
import LoginForm from './login-form.component';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logIn } = this.props;

    return (
      <LoginForm onLogin={logIn} />
    );
  }
}

export default connect(null, {
  logIn,
})(LoginPage);
