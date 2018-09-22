/* eslint-disable */
import './index.css';
import React, { Component, Fragment } from 'react';
import { Input, Container, Row, Button, Card, CardBody, CardTitle } from 'mdbreact';
import API from '../../../api/API';
import { checkNull, handleInputChange, timeout } from '../../../api/validate';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      carts: [],
      //TODO: handle errors
      error: null
    };
    this.name =
      sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
    this.company = sessionStorage.getItem('company');
    this.email = sessionStorage.getItem('email');
    this.id = sessionStorage.getItem('userId');
    this.handleInputChange = handleInputChange.bind(this);
    this.timeout = timeout.bind(this);
  }

  componentWillUnmount() {}

  updatePassword = () => {
    const { password, password2 } = this.state;
    if (password.length < 3 || password2.length < 3) {
      this.timeout({
        error: 'Password must be at least 3 characters'
      });
      return;
    }

    if (password.trim() !== password2.trim()) {
      this.timeout({
        error: 'Passwords do not match'
      });
      return;
    }

    API.updateCustomer({ id: this.id, password })
      .then(result => {
        this.timeout({ result: result.data.success });
      })
      .catch(error => {
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.timeout({ error: err });
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <div className="col-lg-8 offset-lg-2">
            <Card className="mx-0">
              <CardBody>
                <CardTitle>{this.name}</CardTitle>
                <p>Company: {this.company}</p>
                <p>Email: {this.email}</p>
                <h4>Change Password</h4>
                <Input
                  name="password"
                  label="New Password"
                  group
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="password2"
                  label="Confirm Password"
                  group
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                />
                <Button onClick={this.updatePassword}>Submit</Button>
                {this.state.error && (
                  <p className="text-danger">{this.state.error}</p>
                )}
                {this.state.result && (
                  <p className="text-success">{this.state.result}</p>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}
