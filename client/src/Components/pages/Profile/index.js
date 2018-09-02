/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Input, Container, Row, Button, Card, CardBody, CardTitle } from 'mdbreact';
import API from '../../../api/API';
import { checkNull, handleInputChange } from '../../../api/validate';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      carts: []
    };
    this.name = sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
    this.company = sessionStorage.getItem('company');
    this.email = sessionStorage.getItem('email');
  }

  componentDidMount() {
    API.getCarts()
      .then(result => {
        console.log(result);
        this.setState({ carts: result.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.carts.length) {
      return <div className="loader" />;
    }
    console.log(this.state);
    return (
      <Container>
        <Row>
          <div className="col-md-4">
            <Card style={{ width: '100%' }}>
              <CardBody>
                <CardTitle>Your Carts</CardTitle>
                {this.state.carts.length &&
                  this.state.carts.map(
                    (a, i) =>
                      a.isActive ? (
                        <p key={i} className="mb-0 p-2">
                          Active Cart: {a.cartName}
                        </p>
                      ) : (
                        <p key={i} className="mb-0 p-2">
                          {a.cartName}
                        </p>
                      )
                  )}
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
                  group
                  type="password"
                  value={this.state.password}
                  onChange={handleInputChange.bind(this)}
                />
                <Input
                  name="password2"
                  label="Confirm Password"
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
