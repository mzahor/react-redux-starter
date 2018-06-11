import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './auth/login-page/login-page.component';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={LoginPage} />
        </Fragment>
      </Router>
    );
  }
}
