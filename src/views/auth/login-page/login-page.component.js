import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../../redux/auth/auth.actions';
import LoginForm from '../login-form/login-form.component';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logIn, loginInProgress } = this.props;

    return (
      <LoginForm
        disabled={loginInProgress}
        onLogin={logIn}
      />
    );
  }
}

function mapStateToProps({ loginInProgress }) {
  return {
    loginInProgress,
  };
}

const mapDispatchToProps = {
  logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
