import './index.css';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import API from '../../../api/API';

class Login extends React.Component {
  state = { email: '', password: '' };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // tracks user input
  onChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  // sends provided email and password to express for validation
  onSubmit = () => {
    const { email, password } = this.state;
    API.login({ email, password })
      .then(res => {
        console.log(res.data);
        // runs on a successful validation
        if (res.data) {
          // sets user credentials in sessionstorage
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('email', res.data.user.email);
          sessionStorage.setItem('userId', res.data.user.id);
          sessionStorage.setItem('activeCart', res.data.user.carts[0].id);
          // sets the isAuthed state property from App.js to true. Used for protecting routes.
          this.setState({ isAuthed: true });
        } else {
          this.setState({ error: 'error' });
        }
      })
      .catch(err => {
        console.log(err.response);
        const error = err.response ? err.response.data : 'Connection timed out';
        this.setState({ error: error });
      });
  };

  // allows the form to submit on enter.
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    if (sessionStorage.getItem('token')) {
      return <Redirect to="/" />;
    } else {
      return (
        <Container>
          <section className="form-simple">
            <Row>
              <Col lg="8" className="offset-lg-2">
                <Card>
                  <div className="header pt-3 grey lighten-2">
                    <Row className="d-flex justify-content-start">
                      <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                        Log in
                      </h3>
                    </Row>
                  </div>
                  <CardBody className="mx-4 mt-4">
                    <Input
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress}
                      name="email"
                      label="Your email"
                      group
                      type="text"
                      validate
                    />
                    <Input
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress}
                      name="password"
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                    />
                    <p className="font-small grey-text d-flex justify-content-end">
                      Forgot{' '}
                      <a
                        href="#"
                        className="dark-grey-text font-weight-bold ml-1"
                      >
                        {' '}
                        Password?
                      </a>
                    </p>
                    {this.state.error && (
                      <p className="text-danger text-center">
                        {this.state.error}
                      </p>
                    )}
                    <div className="text-center mb-4 mt-5">
                      <Button
                        onClick={this.onSubmit}
                        onKeyPress={this.handleKeyPress}
                        color="danger"
                        type="submit"
                        value="Submit"
                        id="onSubmit-button"
                        className="btn-block z-depth-2 aButton"
                      >
                        Log in
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      );
    }
  }
}

export default Login;
