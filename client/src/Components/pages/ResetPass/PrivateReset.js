import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import API from '../../../api/API';
import ResetPass from './index';

export default class PrivateReset extends Component {
	constructor(props) {
		super(props);
		this.state = { isAuthed: null, token: null };
	}

	componentDidMount() {
		this.checkAuth();
	}

	checkAuth = () => {
		const { token } = this.props.computedMatch.params;
		API.validateResetToken(token)
			.then(result => {
				this.setState({ isAuthed: true, token, email: result.data.success });
			})
			.catch(() => {
				this.setState({ isAuthed: false });
			});
	};

	render() {
		if (this.state.isAuthed === null) {
			return <div className="loader" />;
		} else {
			return this.state.isAuthed ? (
				<ResetPass
					{...this.props}
					token={this.state.token}
					email={this.state.email}
				/>
			) : (
				<Redirect to="/" />
			);
		}
	}
}
