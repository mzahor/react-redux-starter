import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './auth/login.component';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" component={Login} />
        </Fragment>
      </Router>
    );
  }
}
