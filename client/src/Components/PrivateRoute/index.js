import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../api/auth';

// PrivateRoute is a component that accepts another component as a prop.
// Returns that component based on some condition.
// Used to hide access to the cart page if not authed, and login page if authed.
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
