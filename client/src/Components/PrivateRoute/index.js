import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../api/auth';

// PrivateRoute is a component that accepts another component as a prop.
// Returns that component based on some condition.
// Used to hide access to the cart page if not authed, and login page if authed.
const PrivateRoute = ({
  component: Component,
  isAuthed: isAuthed,
  hideLogin: hideLogin,
  ...rest
}) => {
  if (hideLogin) {
    return (
      <Route
        {...rest}
        render={props =>
          !auth.isAuthed() ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthed() ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
};

export default PrivateRoute;
