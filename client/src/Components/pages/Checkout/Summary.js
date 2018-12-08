import React from 'react';
import {
	Container,
	Collapse,
	Row,
	Col,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter
} from 'mdbreact';
import { Link } from 'react-router-dom';

import './Checkout.css';
import EstimateCart from './EstimateCart';
import EstimateDetails from './EstimateDetails';
import EstimateWillCall from './EstimateWillCall';
import API from '../../../api/API';

class Summary extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			collapse: false,
			shippingCost: '',
			isActive: false,
			success: null,
			estimateId: null,
			loading: false,
			errorMsg: null
		};
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.eventDetails = this.props.location.state;
		this.detailsFirst = Object.keys(this.eventDetails.eventProps).slice(0, 6);
		this.detailsSecond = Object.keys(this.eventDetails.eventProps).slice(6, 13);
		this.detailsWill = Object.keys(this.eventDetails.eventProps).slice(13, 18);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	viewWillCall = (keys, details) => {
		let hasValues = false;
		keys.map(key => {
			if (details[key]) {
				hasValues = true;
				return;
			}
		});

		return hasValues;
	};

	toggle = (result, id = null, errorMsg = null) => {
		this.setState({
			modal: !this.state.modal,
			success: result,
			estimateId: id,
			loading: false,
			errorMsg: errorMsg
		});
	};
	toggleCollapse() {
		this.setState({ collapse: !this.state.collapse });
	}

	submitButton = () => {
		this.setState({ loading: true });
		API.getEstimate(this.props.location.state)
			.then(result => {
				sessionStorage.setItem('activeCart', result.data.activeCart);
				sessionStorage.setItem('cartTotal', 0);
				this.toggle(true, result.data.estimateId);
			})
			.catch(error => {
				const err =
					error.message && error.message.includes('timeout')
						? 'Connection timed out'
						: error.response.data.message;
				this.toggle(false, null, err);
			});
	};

	handleCheck = event => {
		this.setState({ isActive: event.target.checked });
	};

	submitHandler = event => {
		event.preventDefault();
		event.target.className += ' was-validated';
	};

	changeHandler = event => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	viewWillCall = (keys, details) => {
		let hasValues = false;

		keys.map(key => {
			if (details[key]) {
				hasValues = true;
				return;
			}
		});

		return hasValues;
	};

	render() {
		const eventDetails = this.props.location.state;

		return (
			<Container className="mt-5">
				<h3 style={{ marginTop: '80px' }} className="text-center mb-3">
					Summary
				</h3>
				<Row>
					<Col lg="12">
						<EstimateCart cart={eventDetails.cartProps} />
					</Col>
				</Row>
				<Row>
					<Col lg="12">
						<EstimateDetails
							detailsCol1={this.detailsFirst}
							detailsCol2={this.detailsSecond}
							realValues={this.eventDetails.eventProps}
						/>
					</Col>
				</Row>
				{this.viewWillCall(this.detailsWill, this.eventDetails.eventProps) && (
					<EstimateWillCall
						details={this.detailsWill}
						realValues={this.eventDetails.eventProps}
					/>
				)}

				<Row className="mt-6 text-center">
					<Col md="">
						<Button
							outline
							color="warning"
							onClick={this.toggleCollapse}
							style={{ marginBottom: '1rem' }}
						>
							Terms & Conditions
						</Button>
						<Collapse isOpen={this.state.collapse}>
							<p>
								In the event of damage to the equipment, client agrees to pay
								any & all reasonable cost to return equipment to its original
								condition. Overtime fee: $35.00 per staff per hour (or any part
								thereof) will be charged in addition to client if set and/or
								strike can not take place at time indicated on contract.
								Additionally, a $100.00 minimum service charge will be assessed
								on any orders of $650.00 or less (Not including taxes and
								trucking).
							</p>
						</Collapse>
						<form
							className="needs-validation"
							onSubmit={this.submitHandler}
							noValidate
						>
							<div className="custom-control custom-checkbox animated jello mb-3">
								<input
									type="checkbox"
									className="custom-control-input"
									id="customControlValidation1"
									onChange={event => this.handleCheck(event)}
									required
								/>
								<label
									className="custom-control-label"
									htmlFor="customControlValidation1"
								>
									Agree To Terms and Conditions
								</label>
								<div className="invalid-feedback">
									You must agree before submitting.
								</div>
							</div>
							<Link
								to={{
									pathname: '/checkout/event',
									state: {
										cartProps: this.props.location.state.cartProps,
										eventProps: this.props.location.state.eventProps
									}
								}}
							>
								<Button>
									<i className="fa fa-arrow-left" aria-hidden="true" />
									{'  '}
									{'  '}
									Back
								</Button>
							</Link>
							<Button
								color="unique"
								disabled={!this.state.isActive || this.state.loading}
								onClick={this.submitButton}
							>
								{' '}
								{this.state.loading ? (
									<i className="fa fa-spinner fa-spin" />
								) : (
									'Submit Order'
								)}
								{'  '}
								<i className="fa fa-rocket" aria-hidden="true" />
							</Button>
						</form>
					</Col>
				</Row>

				<Modal isOpen={this.state.modal}>
					<Link to={`/`}>
						<ModalHeader toggle={this.toggle}>
							{this.state.success ? 'Thank you!' : 'Uh oh...'}
						</ModalHeader>{' '}
					</Link>
					<ModalBody>
						{this.state.success
							? `We will be contacting you soon. Your estimate ID is: ${
									this.state.estimateId
							  }`
							: this.state.errorMsg}
					</ModalBody>
					<ModalFooter>
						<Link to={`/`}>
							<Button onClick={this.toggle}>Close</Button>
						</Link>
					</ModalFooter>
				</Modal>
			</Container>
		);
	}
}

export default Summary;
