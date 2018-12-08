import React, { Component } from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import { Link } from 'react-router-dom';

import API from '../../../api/API';
import { checkNull, timeout, handleInputChange } from '../../../api/validate';

class ResetPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			success: null,
			error: null,
			password: '',
			password2: '',
			isAdmin: null
		};
		this.handleInputChange = handleInputChange.bind(this);
		this.timeout = timeout.bind(this);
	}

	resetPasswordBtn = () => {
		const { password, password2 } = this.state;
		this.validateInput(password, password2);
	};

	reset = (token, password) => {
		API.resetPassword(token, password)
			.then(result => {
				this.setState({
					success: 'Your password has been updated',
					isAdmin: result.data.isAdmin
				});
			})
			.catch(error => {
				const err =
					error.message && error.message.includes('timeout')
						? 'Connection timed out'
						: error.response.data.message;
				this.timeout({ error: err });
			});
	};

	validateInput = (password, password2) => {
		if (!checkNull({ password, password2 })) {
			this.timeout({ error: 'Please fill out all fields' });
			return;
		}

		if (password.length < 3 || password2.length < 3) {
			this.timeout({
				error: 'Password must be at least 3 characters'
			});
			return;
		}

		if (password.trim() !== password2.trim()) {
			this.timeout({
				error: 'Passwords do not match'
			});
			return;
		}
		this.reset(this.props.token, password);
	};

	render() {
		return (
			<Container>
				<section className="form-simple">
					<Row>
						<Col lg="8" className="offset-lg-2">
							<Card>
								<div className="header pt-3 grey lighten-2">
									<Row className="d-flex justify-content-start">
										<h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
											Set Password
										</h3>
									</Row>
								</div>
								<CardBody className="mx-4 mt-4">
									<Input
										value={this.props.email}
										name="email"
										label="Email"
										group
										type="email"
										disabled
									/>
									<Input
										onChange={this.handleInputChange}
										name="password"
										label="Password"
										group
										type="password"
									/>
									<Input
										onChange={this.handleInputChange}
										onKeyPress={this.handleKeyPress}
										name="password2"
										label="Confirm Password"
										group
										type="password"
										containerClass="mb-0"
									/>
									<div className="text-center mb-4 mt-5">
										<Button
											onClick={this.resetPasswordBtn}
											onKeyPress={this.handleKeyPress}
											color="danger"
											type="submit"
											value="Submit"
											id="onSubmit-button"
											className="btn-block z-depth-2"
										>
											Set Password
										</Button>
										{this.state.error && (
											<p className="text-center text-danger">
												{this.state.error}
											</p>
										)}
										{this.state.success && (
											<div>
												<p className="text-center text-success">
													{this.state.success}
												</p>
												<p className="text-center">
													You can login{' '}
													<Link
														style={{
															color: '#478dff',
															textDecoration: 'underline'
														}}
														to={this.state.isAdmin ? '/admin' : '/login'}
													>
														Here
													</Link>
												</p>
											</div>
										)}
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</section>
			</Container>
		);
	}
}

export default ResetPass;
