import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminRoutes = ({ path, component: Component, ...props }) => {
	const routes = ['/dashboard'];

	const Unauthed = () => {
		sessionStorage.clear();
		return <Redirect to="/" />;
	};

	return routes.includes(path) ? <Component {...props} /> : <Unauthed />;
};

export default AdminRoutes;
