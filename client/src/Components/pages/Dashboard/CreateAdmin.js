import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import API from '../../../api/API';
import {
  checkEmail,
  checkNull,
  handleInputChange,
  timeout
} from '../../../api/validate';

const styles = {
  h2: {
    marginTop: '20px',
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
      email: '',
      password: '',
      password2: '',
      result: null,
      unauthorized: false,
      superAdmin: false,
      error: null
    };
    this.timeout = timeout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  checkSuperAdmin = () => this.setState({ superAdmin: !this.state.superAdmin });

  onSubmit = () => {
    const admin = {};
    admin.firstName = this.state.firstName;
    admin.lastName = this.state.lastName;
    admin.email = this.state.email;
    admin.password = this.state.password;
    admin.password2 = this.state.password2;

    if (!checkNull(admin)) {
      this.timeout({ error: 'All fields must be completed' });
      return;
    }

    admin.superAdmin = this.state.superAdmin;

    if (!checkEmail(admin.email)) {
      this.timeout({ error: 'Please enter a valid email address' });
      return;
    }

    if (admin.password.length < 3 || admin.password2.length < 3) {
      this.timeout({ error: 'Password must be at least 3 characters' });
      return;
    }

    if (admin.password !== admin.password2) {
      this.timeout({ error: 'Passwords do not match' });
      return;
    }

    // this.props.checkAuth will update the state of index.js to re-direct to /admin if there is a 401
    API.createAdmin(admin)
      .then(res => {
        this.timeout({ result: res.data.success });
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          this.props.checkAuth(true);
        } else {
          const err =
            error.message && error.message.includes('timeout')
              ? 'Connection timed out'
              : error.response.data.message;
          this.timeout({ error: err });
        }
      });
  };

  render() {
    return (
      <Fragment>
        <div className="hideIcon">
          <i onClick={this.props.toggleSideBar} className="fa fa-bars icon" />
        </div>
        <Container>
          <Row>
            <div style={styles.h2}>
              <h2>Create a new Admin</h2>
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
                    onChange={handleInputChange.bind(this)}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    icon="user"
                    group
                    type="text"
                    value={this.state.lastName}
                    onChange={handleInputChange.bind(this)}
                  />
                  <Input
                    name="email"
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    value={this.state.email}
                    onChange={handleInputChange.bind(this)}
                  />
                  <Input
                    name="password"
                    label="Password"
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
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      defaultChecked={this.state.superAdmin}
                      onChange={this.checkSuperAdmin}
                      type="checkbox"
                      className="custom-control-input"
                      id="super"
                      required
                    />
                    <label className="custom-control-label" htmlFor="super">
                      Super Admin
                    </label>
                  </div>
                </div>
                <div>
                  <Button
                    color="primary"
                    name="update-profile"
                    onClick={this.onSubmit}
                  >
                    Create Admin
                  </Button>
                  {this.state.result && (
                    <p className="text-success">{this.state.result}</p>
                  )}
                  {this.state.error && (
                    <p className="text-danger">{this.state.error}</p>
                  )}
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
