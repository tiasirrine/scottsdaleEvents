import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../api/auth';

const PrivateRoute = ({
  component: Component,
  isAuthed: isAuthed,
  hideLogin: hideLogin,
  ...rest
}) => {
  console.log('adsfadsfa', hideLogin);
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
