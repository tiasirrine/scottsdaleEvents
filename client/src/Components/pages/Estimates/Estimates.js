import React, { Component } from 'react';
import { Container, Row } from 'mdbreact';

import API from '../../../api/API';
import errorMsg from '../../../api/errorMsg';
import EstimateCard from './EstimateCard';

export default class Estimates extends Component {
	constructor(props) {
		super(props);
		this.state = { estimates: null, error: null };
		this.customerId = sessionStorage.getItem('userId');
		this.errorMsg = errorMsg.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getEstimates();
	}

	getEstimates = () => {
		API.getEstimates(this.customerId)
			.then(result => {
				this.setState({ estimates: result.data.success });
			})
			.catch(this.errorMsg);
	};

	render() {
		console.log('PROPS:', this.props);
		if (!this.state.estimates && !this.state.error) {
			return <div className="loader" />;
		}
		return (
			<Container className="margintop-100">
				<h2 className="text-center">Past Estimates</h2>
				<p className="text-center text-danger">
					{this.state.error && 'An error occured while loading your estimates'}
				</p>
				<Row>
					{this.state.estimates &&
						this.state.estimates.map((estimate, i) => (
							<EstimateCard key={i} estimate={estimate} />
						))}
				</Row>
			</Container>
		);
	}
}
