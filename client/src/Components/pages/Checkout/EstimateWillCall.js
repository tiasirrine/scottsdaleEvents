import React from 'react';
import { Card, CardBody, Row } from 'mdbreact';

import EstimateDetails from './EstimateDetails';
import './Checkout.css';

export default class EstimateWillCall extends EstimateDetails {
	render() {
		return (
			<div>
				<Card className="mb-3">
					<CardBody>
						<h3 className="text-center mb-3">Will Call Details</h3>{' '}
						<Row>{this.theBody(this.props.details, '12')}</Row>
					</CardBody>
				</Card>
			</div>
		);
	}
}
