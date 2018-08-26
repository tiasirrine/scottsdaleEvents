import React, { Component, Fragment } from 'react';
import { Input, Container, Row, Button, Card, CardBody, CardTitle } from 'mdbreact';
import API from '../../../api/API';
import { checkNull, handleInputChange } from '../../../api/validate';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: ''
    };
    this.name = sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
    this.company = sessionStorage.getItem('company');
    this.email = sessionStorage.getItem('email');
  }

  render() {
    return (
      <Container style={{ maxWidth: '900px' }}>
        <Row>
          <div className="col-md-4">
            <Card style={{ width: '100%' }}>
              <CardBody>
                <CardTitle>Your Carts</CardTitle>
                <p>Active Cart: August Event</p>
                <p>January 2018 Event</p>
              </CardBody>
            </Card>
          </div>
          <div className="col-md-8">
            <Card>
              <CardBody>
                <CardTitle>{this.name}</CardTitle>
                <p>Company: {this.company}</p>
                <p>Email: {this.email}</p>
                <h4>Change Password</h4>
                <Input
                  name="password"
                  label="New Password"
                  icon="lock"
                  group
                  type="password"
                  value={this.state.password}
                  onChange={handleInputChange.bind(this)}
                />
                <Input
                  name="password2"
                  label="Confirm Password"
                  icon="lock"
                  group
                  type="password"
                  value={this.state.password2}
                  onChange={handleInputChange.bind(this)}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}
