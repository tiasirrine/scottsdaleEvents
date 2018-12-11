import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import API from '../../api/API';
import CustomerRoutes from './CustomerRoutes';
import AdminRoutes from './AdminRoutes';

class PrivateRoute extends Component {
	state = { isAuthed: null, isAdmin: null };

	componentDidMount() {
		this.checkAuth();
	}

	checkAuth = async () => {
		try {
			const { data } = await API.checkToken();
			this.setState({ isAuthed: true, isAdmin: data.isAdmin });
		} catch (e) {
			this.setState({ isAuthed: false });
		}
	};

	render() {
		if (this.state.isAuthed === null) {
			return <div className="loader" />;
		} else if (this.state.isAuthed) {
			if (this.state.isAdmin === false) {
				return <CustomerRoutes {...this.props} />;
			} else {
				return <AdminRoutes {...this.props} />;
			}
		} else {
			return <Redirect to="/" />;
		}
	}
}

export default PrivateRoute;
