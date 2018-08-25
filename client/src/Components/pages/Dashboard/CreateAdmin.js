import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import API from '../../../api/API';
import { checkEmail, checkNull, handleInputChange } from '../../../api/validate';

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
      unauthorized: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubmit = () => {
    const { result, unauthorized, ...admin } = this.state;

    if (!checkNull(admin)) {
      this.setState({ result: 'All fields must be completed' });
      return;
    }

    if (!checkEmail(admin.email)) {
      this.setState({ result: 'Please enter a valid email address' });
      return;
    }

    if (admin.password.length < 3 || admin.password2.length < 3) {
      this.setState({ result: 'Password must be at least 3 characters' });
      return;
    }

    if (admin.password !== admin.password2) {
      this.setState({ result: 'Passwords do not match' });
      return;
    }

    API.createAdmin(admin)
      .then(res => {
        if (res.data.success) {
          this.setState({ result: res.data.success });
        }
        if (res.data.error) {
          this.setState({ result: res.data.error });
        }
      })
      .catch(err => {
        console.log(err);
        // err.response exists when the server throws a 401. a 401 occurs when a token is rejected
        // this.props.checkAuth will update the state of index.js to re-direct to /admin if there is a 401s
        if (err.response) {
          if (err.response.status === 401) {
            this.props.checkAuth(true);
          }
        } else {
          this.setState({ result: err.data ? err.data.error : null });
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
                </div>
                <div>
                  <Button color="primary" name="update-profile" onClick={this.onSubmit}>
                    Create Admin
                  </Button>
                  {this.state.result && <p>{this.state.result}</p>}
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
