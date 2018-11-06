import React from 'react';

const Admin = ({ Component, ...rest }) => {
	return <Component {...rest} title="Administrator" />;
};

export default Admin;
