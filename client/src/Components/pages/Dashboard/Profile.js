import React, { Component } from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import API from '../../../api/API';

const styles = {
  formTop: {
    marginBottom: '70px'
  },
  h2: {
    marginLeft: '20px',
    marginBottom: '30px'
  }
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      email: this.props.user.email || '',
      password: '',
      password2: '',
      result: null,
      lastPressed: null
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  updateAdmin = e => {
    console.log(e.target);
    const { name } = e.target;
    let value;

    // checks which button was pressed. either update profile, or update password
    // only grabs the necessary values for the button pressed
    if (name === 'update-password') {
      value = { id: this.state.id, password: this.state.password2 };
    } else {
      value = {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      };
    }

    API.updateAdmin(value)
      .then(result => {
        console.log('adsfas', result);
        this.setState({ result: result.data.success, lastPressed: name });
      })
      .catch(err => {
        console.log(err);
        this.setState({ result: err.data.error, lastPressed: name });
      });
  };

  render() {
    console.log(this.state);
    return (
      <Container>
        <Row>
          <div style={styles.h2}>
            <h2>Welcome, {sessionStorage.getItem('firstName')}</h2>
          </div>
          <Col md="8" className="offset-md-2">
            <form style={styles.formTop}>
              <p className="h5 text-center mb-4">Adjust Your Profile</p>
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
                  name="email"
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <Button
                  color="primary"
                  name="update-profile"
                  onClick={this.updateAdmin}
                >
                  Update Profile
                </Button>
              </div>
              {this.state.lastPressed === 'update-profile' &&
                this.state.result && <p>{this.state.result}</p>}
            </form>
            <form>
              <p className="h5 text-center mb-4">Change Your Password</p>
              <div className="grey-text">
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
                <Button
                  color="primary"
                  name="update-password"
                  onClick={this.updateAdmin}
                >
                  Update Password
                </Button>
              </div>
              {this.state.lastPressed === 'update-password' &&
                this.state.result && <p>{this.state.result}</p>}
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}
