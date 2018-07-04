import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Input, FormBtn } from '../../Form';
import API from '../../../api/API';

class Login extends Component {
  state = {};

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.checkUser(this.state)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // };

  render() {
    console.log('LOGIN:', this.props.isAuthed);
    if (this.props.isAuthed === true) {
      return <Redirect to="/admin" />;
    } else {
      return (
        <form>
          <Input
            onChange={this.props.inputChange}
            name="username"
            placeholder="Username (required)"
          />
          <Input
            type="password"
            onChange={this.props.inputChange}
            name="password"
            placeholder="Password (required)"
          />

          <FormBtn onClick={this.props.checkAuth}>Login</FormBtn>
        </form>
      );
    }
  }
}

export default Login;
