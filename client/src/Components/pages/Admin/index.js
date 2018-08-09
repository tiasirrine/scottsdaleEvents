import React from 'react';
// import { Redirect } from 'react-router-dom';

const Admin = ({ Component, ...rest }) => {
  return <Component {...rest} title="Administrator" />;
};

export default Admin;
