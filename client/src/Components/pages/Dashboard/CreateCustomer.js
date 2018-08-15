import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import API from '../../../api/API';

const styles = {
  h2: {
    marginLeft: '20px',
    marginBottom: '30px'
  }
};

export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      password: '',
      password2: '',
      result: null,
      unauthorized: false
    };
  }

  // attached to each input field to update the input value
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { result, unauthorized, ...customer } = this.state;
    API.createCustomer(customer)
      .then(res => {
        console.log(res);
        this.setState({ result: res.data.success });
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 401) {
            this.setState({ unauthorized: true });
          }
        } else {
          this.setState({ result: err.data ? err.data.error : null });
        }
      });
  };

  render() {
    if (this.state.unauthorized) {
      return (
        <Redirect
          to={{
            pathname: '/admin',
            state: { msg: 'Your session has expired' }
          }}
        />
      );
    }
    return (
      <Container>
        <Row>
          <div style={styles.h2}>
            <h2>Create a new customer</h2>
          </div>
          <Col md="8" className="offset-md-2">
            <form>
              <div className="grey-text">
                <Input
                  name="firstName"
                  label="First name"
                  icon="user"
                  group
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  icon="user"
                  group
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="company"
                  label="Company Name"
                  icon="pencil"
                  group
                  type="text"
                  value={this.state.company}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="email"
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="password"
                  label="New Password"
                  icon="lock"
                  group
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Input
                  name="password2"
                  label="Confirm Password"
                  icon="lock"
                  group
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <Button
                  color="primary"
                  name="update-profile"
                  onClick={this.onSubmit}
                >
                  Create Customer
                </Button>
                {this.state.result && <p>{this.state.result}</p>}
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}
