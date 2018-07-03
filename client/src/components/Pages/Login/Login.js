import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from '../../Form';
import API from '../../../api/API';

class Login extends Component {
  state = {};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.checkUser(this.state)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form>
        <Input // value={}
          onChange={this.handleInputChange}
          name="username"
          placeholder="Username (required)"
        />
        <Input // value={}
          type="password"
          onChange={this.handleInputChange}
          name="password"
          placeholder="Password (required)"
        />

        <FormBtn onClick={this.handleFormSubmit}>Login</FormBtn>
      </form>
    );
  }
}

export default Login;
