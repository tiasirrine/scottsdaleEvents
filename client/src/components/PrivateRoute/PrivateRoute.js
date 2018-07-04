import React from 'react';
// import Admin from '../Pages/Admin';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthed: isAuthed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
