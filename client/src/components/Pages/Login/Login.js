import React, { Component } from 'react';
import { Input, TextArea, FormBtn } from '../../Form';
import './Login.css';

class Login extends Component {
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event
      .preventDefault()

      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="admin-form">
        <form>
          <Input // value={}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
          />
          <Input // value={}
            input
            type="password"
            onChange={this.handleInputChange}
            name="password"
            placeholder="Password (required)"
          />

          <FormBtn onClick={this.handleFormSubmit}>Login</FormBtn>
        </form>
      </div>
    );
  }
}

export default Login;
