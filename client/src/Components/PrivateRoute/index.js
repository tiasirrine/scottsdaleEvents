import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import API from '../../api/API';

// PrivateRoute is a component that accepts another component as a prop.
// Returns that component based on some condition.

class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = { isAuthed: null, isAdmin: null };
	}

	componentDidMount() {
		this.checkAuth();
	}

	// checks if a user is authenticated.
	checkAuth = () => {
		API.checkToken()
			.then(res => {
				this.setState({ isAuthed: true, isAdmin: res.data.isAdmin });
			})
			.catch(err => {
				console.log(err);
				this.setState({ isAuthed: false });
			});
	};

	render() {
		const { component, ...rest } = this.props;
		const Component = component;
		// used while waiting for state to change
		if (this.state.isAuthed === null) {
			return <div className="loader" />;
		} else if (this.state.isAuthed === false) {
			// checkAuth will return false if a token is expired
			// clears session storage in case it is
			sessionStorage.clear();
			return <Redirect to="/" />;
			// if the user is an admin, and accessing the dashboard, allow access. customers cannot access the dashboard
		} else if (this.props.path === '/dashboard' && this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
			// if the user is a customer, and accessing the cart, allow access. admins cannot access the cart
		} else if (this.props.path === '/checkout' && !this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		} else if (this.props.path === '/profile' && !this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		} else if (this.props.path === '/carts' && !this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		} else if (this.props.path === '/estimates' && !this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		} else if (this.props.path === '/estimates/:id' && !this.state.isAdmin) {
			return <Route {...rest} render={props => <Component {...props} />} />;
		} else {
			return <Redirect to="/" />;
		}
	}
}

export default PrivateRoute;
