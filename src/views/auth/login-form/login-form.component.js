import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import { setValue } from '../../../utils/react-utils';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.emailChange = setValue.bind(this, 'email');
    this.passwordChange = setValue.bind(this, 'password');
    this.onLogin = this.onLogin.bind(this);
    this.onGoogleResponse = this.onGoogleResponse.bind(this);
  }

  onLogin() {
    const { email, password } = this.state;
    this.props.onLogin({ email, password });
  }

  onGoogleResponse(...args) {
    console.log(args);
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
        <Row>
          <GoogleLogin
            clientId="614557513609-8g3de6inop93kghohugsrrthnfmuh537.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.onGoogleResponse}
            onFailure={this.onGoogleResponse}
          />
        </Row>
      </Form>
    );
  }
}
