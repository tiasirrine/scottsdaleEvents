/* eslint-disable */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from '../../../api/API';
import ResetPass from './index';
// PrivateRoute is a component that accepts another component as a prop.
// Returns that component based on some condition.

export default class PrivateReset extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthed: null, token: null };
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    // const { path: location } = this.props.computedMatch;
    const { token } = this.props.computedMatch.params;
    API.validateResetToken(token)
      .then(result => {
        this.setState({ isAuthed: true, token, email: result.data.success });
      })
      .catch(() => {
        this.setState({ isAuthed: false });
      });
  };

  render() {
    if (this.state.isAuthed === null) {
      return <div className="loader" />;
    } else {
      return this.state.isAuthed ? (
        <ResetPass
          {...this.props}
          token={this.state.token}
          email={this.state.email}
        />
      ) : (
        <Redirect to="/" />
      );
    }
  }
}
