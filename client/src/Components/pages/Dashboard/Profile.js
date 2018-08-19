import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import API from '../../../api/API';

const styles = {
  formTop: {
    marginBottom: '70px'
  },
  h2: {
    marginTop: '20px',
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // attached to each input field to update the input value
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  // updates a users profile and password.
  // each button has a 'name' attribute to determine what button was pressed
  // and to help identify what message to display to the user,
  // as well as where to display the message
  updateAdmin = e => {
    console.log(e.target);
    const { name } = e.target;
    const { firstName, lastName, email, id, password, password2 } = this.state;
    // will hold the value that needs to be updated
    let value;

    // checks which button was pressed. either update profile, or update password
    // only grabs the necessary values for the button pressed
    if (name === 'update-password') {
      value = { id, password };
    } else {
      value = { id, firstName, lastName, email };
    }

    // calls api function to update the user in the db
    API.updateAdmin(value)
      .then(result => {
        // if passwords are being updated, set the password msg
        let passwordMsg;
        if (name === 'update-password')
          passwordMsg = 'Your password has been updated';
        this.setState({
          result: passwordMsg || result.data.success,
          lastPressed: name
        });
      })
      .catch(err => {
        console.log(err);
        // err.response exists when the server throws a 401. a 401 occurs when a token is rejected
        // this.props.checkAuth will update the state of index.js to re-direct to /admin if there is a 401
        if (err.response) {
          if (err.response.status === 401) {
            this.props.checkAuth(true);
          }
        } else {
          this.setState({
            result: err.data ? err.data.error : null,
            lastPressed: name
          });
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
      </Fragment>
    );
  }
}
