import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { setValue } from '../../../utils/react-utils';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.emailChange = setValue.bind(this, 'email');
    this.passwordChange = setValue.bind(this, 'password');
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;
    this.props.onLogin({ email, password });
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="loginEmail" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="loginEmail" onChange={this.emailChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="loginPassword" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type="email" name="password" id="loginPassword" onChange={this.passwordChange} />
          </Col>
        </FormGroup>
        <Button color="danger" onClick={this.onLogin}>Login</Button>
      </Form>
    );
  }
}
