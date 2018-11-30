import React from 'react';
import { Button } from 'mdbreact';

import API from '../../../api/API';
import { timeout } from '../../../api/validate';

export default class CopyCartBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = { success: null, error: null, loading: null };
		this.timeout = timeout.bind(this);
	}

	onClick = () => {
		this.setState({ loading: true });
		API.copyCart(this.props.cartId, sessionStorage.getItem('activeCart'))
			.then(() => {
				setTimeout(
					() => this.timeout({ success: 'Success', loading: false }),
					300
				);
			})
			.catch(error => {
				const err =
					error.message && error.message.includes('timeout')
						? 'Connection timed out'
						: error.response.data.message;
				this.timeout({ error: err, loading: false });
			});
	};

	render() {
		return (
			<React.Fragment>
				<Button
					disabled={this.state.loading}
					onClick={this.onClick}
					size="md"
					className="text-white mx-0"
				>
					{this.state.loading ? (
						<i className="fa fa-spinner fa-spin" />
					) : (
						'Copy To Active Cart'
					)}
				</Button>
				{this.state.success && (
					<p className="text-success">{this.state.success}</p>
				)}
				{this.state.error && <p className="text-danger">{this.state.error}</p>}
			</React.Fragment>
		);
	}
}
