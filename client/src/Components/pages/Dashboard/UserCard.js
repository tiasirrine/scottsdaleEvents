import React, { Component } from 'react';
import { Input, Button, Card, CardBody, CardTitle } from 'mdbreact';

import {
	checkEmail,
	checkNull,
	handleInputChange,
	timeout
} from '../../../api/validate';
import API from '../../../api/API';

export default class UserCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modify: false,
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName,
			company: this.props.user.company,
			email: this.props.user.email,
			suspend: this.props.user.suspend,
			superAdmin: this.props.user.superAdmin || false,
			result: null,
			unauthorized: false,
			confirmDelete: false,
			error: null
		};
		this.timeout = timeout.bind(this);
	}

	checkSuperAdmin = () => this.setState({ superAdmin: !this.state.superAdmin });

	// used to reveal a form to modify a user
	modifyClick = () => this.setState({ modify: !this.state.modify });

	// used to set the state.suspended value to true when updating a user
	suspendClick = () => this.setState({ suspend: !this.state.suspend });

	// reveals a delete confirmation
	firstDeleteClick = () => this.setState({ confirmDelete: true });

	// deletes the user in the db, and removes the user from the state of the ViewUser component
	secondDeleteClick = () => {
		const { id } = this.props.user;
		API.deleteUser(id, this.props.userType)
			.then(() => {
				this.props.deleteUser(id);
			})
			.catch(error => {
				if (error.response && error.response.status === 401) {
					this.props.checkAuth(true);
				} else {
					const err =
						error.message && error.message.includes('timeout')
							? 'Connection timed out'
							: error.response.data.message;
					this.timeout({ error: err });
				}
			});
	};

	// used to hide the delete confirmation
	denyDeleteClick = () => this.setState({ confirmDelete: false });

	// updates a user
	submitClick = () => {
		const user = {};
		user.firstName = this.state.firstName;
		user.lastName = this.state.lastName;
		user.company = this.state.company;
		user.email = this.state.email;
		user.id = this.props.user.id;

		// checks for null form values
		if (!checkNull(user)) {
			this.timeout({ error: 'All fields must be completed' });
			return;
		}

		// set the suspended value here, since its ok for it to be false.
		// if set above the checkNull function, checkNull will return false each time
		user.suspend = this.state.suspend;
		user.superAdmin = this.state.superAdmin;

		if (!checkEmail(user.email)) {
			this.timeout({ error: 'Please enter a valid email address' });
			return;
		}

		API.updateUser(user, this.props.userType)
			.then(result => {
				const { success } = result.data;
				this.setState({ result: success, ...user });
				setTimeout(() => this.setState({ result: null }), 3000);
			})
			.catch(error => {
				const err =
					error.message && error.message.includes('timeout')
						? 'Connection timed out'
						: error.response.data.message;
				if (err && err.response && err.response.status === 401) {
					this.props.checkAuth(true);
				} else {
					this.timeout({ error: err });
				}
			});
	};

	render() {
		return (
			<Card>
				<CardBody>
					<CardTitle>
						Name: {this.state.firstName} {this.state.lastName}
					</CardTitle>
					<div className="d-flex flex-column flex-lg-row justify-content-between">
						<p>ID: {this.props.user.id}</p>
						<p>Email: {this.state.email} </p>
						{this.props.user.superAdmin !== undefined && (
							<p>Super Admin: {this.state.superAdmin ? 'True' : 'False'}</p>
						)}
						{this.state.company && <p>Company: {this.state.company}</p>}
					</div>
					<p>Status: {!this.state.suspend ? 'Active' : 'Suspended'}</p>
					<div>
						<Button onClick={this.modifyClick}>
							{!this.state.modify ? 'Modify' : 'Hide'}
						</Button>
						<Button onClick={this.firstDeleteClick}>Delete</Button>
						{this.state.confirmDelete && (
							<p>
								Are you sure?{' '}
								<span
									className="text-success p-2"
									style={{ cursor: 'pointer' }}
									onClick={this.secondDeleteClick}
								>
									Yes{' '}
								</span>{' '}
								<span
									onClick={this.denyDeleteClick}
									className="text-danger p-2"
									style={{ cursor: 'pointer' }}
								>
									No
									{}
								</span>
							</p>
						)}
						{this.deleteResult && <p>{this.deleteResult}</p>}
					</div>
					{this.state.modify && (
						<form>
							<div className="grey-text">
								<Input
									name="firstName"
									label="First name"
									icon="user"
									group
									type="text"
									value={this.state.firstName}
									onChange={handleInputChange.bind(this)}
								/>
								<Input
									name="lastName"
									label="Last Name"
									icon="user"
									group
									type="text"
									value={this.state.lastName}
									onChange={handleInputChange.bind(this)}
								/>
								{this.state.company && (
									<Input
										name="company"
										label="Company Name"
										icon="pencil"
										group
										type="text"
										value={this.state.company}
										onChange={handleInputChange.bind(this)}
									/>
								)}
								<Input
									name="email"
									label="Email"
									icon="envelope"
									group
									type="email"
									value={this.state.email}
									onChange={handleInputChange.bind(this)}
								/>
								<div className="custom-control custom-checkbox mb-3">
									<input
										defaultChecked={this.state.suspend}
										onChange={this.suspendClick}
										type="checkbox"
										className="custom-control-input"
										id="suspend"
										required
									/>
									<label className="custom-control-label" htmlFor="suspend">
										Suspend User
									</label>
								</div>
								{this.props.user.superAdmin !== undefined && (
									<div className="custom-control custom-checkbox mb-3">
										<input
											defaultChecked={this.state.superAdmin}
											onChange={this.checkSuperAdmin}
											type="checkbox"
											className="custom-control-input"
											id="super-admin"
											required
										/>
										<label
											className="custom-control-label"
											htmlFor="super-admin"
										>
											Super Admin
										</label>
									</div>
								)}
							</div>
							<div>
								<Button
									color="primary"
									name="update-profile"
									onClick={this.submitClick}
								>
									Update User
								</Button>
								{this.state.result && (
									<p className="text-success">{this.state.result}</p>
								)}
								{this.state.error && (
									<p className="text-danger">{this.state.error}</p>
								)}
							</div>
						</form>
					)}
				</CardBody>
			</Card>
		);
	}
}
