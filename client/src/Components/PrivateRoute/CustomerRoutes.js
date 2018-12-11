import React from 'react';
import { Redirect } from 'react-router-dom';

const CustomerRoutes = ({ path, component: Component, ...props }) => {
	const routes = ['/profile', '/carts', '/estimates', '/checkout'];

	const Unauthed = () => {
		sessionStorage.clear();
		return <Redirect to="/" />;
	};

	return routes.includes(path) ? <Component {...props} /> : <Unauthed />;
};

export default CustomerRoutes;
