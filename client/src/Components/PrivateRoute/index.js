import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from '../../api/API';

// PrivateRoute is a component that accepts another component as a prop.
// Returns that component based on some condition.
// Used to hide access to the cart page if not authed, and login page if authed.

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthed: null, loadedCart: null };
    this.auth = this.checkAuth();
  }

  checkAuth = () => {
    return API.loadCart()
      .then(res => this.setState({ isAuthed: true, loadedCart: res.data }))
      .catch(err => {
        this.setState({ isAuthed: false });
      });
  };

  render() {
    const { component, ...rest } = this.props;
    const Component = component;
    if (this.state.isAuthed === null) {
      return <div>Loading...</div>;
    } else if (this.state.isAuthed === false) {
      // checkAuth will return false if a token is expired
      // clears session storage in case it is
      sessionStorage.clear();
      return <Redirect to="/login" />;
    } else {
      return (
        <Route
          {...rest}
          render={props => (
            <Component {...props} loadedCart={this.state.loadedCart} />
          )}
        />
      );
    }
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return API.loadCart()
//     .then(res => {
//       <Route {...rest} render={props => <Component {...props} />} />;
//     })
//     .catch(err => {
//       <Redirect to="/login" />;
//     });

// const isAuthed = () =>
//   API.loadCart()
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       return err.response.status;
//     });

// return (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthed() !== 401 ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />
// );
// };

export default PrivateRoute;
