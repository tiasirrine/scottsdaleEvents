import React, { Fragment } from 'react';
import { Col, Container, Row, CardBody } from 'mdbreact';

import { timeout, handleInputChange } from '../../../api/validate';
import { CartValueContext } from './index';
import InventoryCard from './InventoryCard';

class ShowPageComponentWrapper extends InventoryCard {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 0,
			isAuthed: false,
			success: null,
			isAdmin: null,
			inventoryImages: [],
			error: null
		};
		this.timeout = timeout.bind(this);
		this.handleInputChange = handleInputChange.bind(this);
		this.product = this.props.location.state.inventoryProps;
	}

	// checks if a user is authed. If so, displays cart and qty.
	componentDidMount() {
		window.scrollTo(0, 0);
		this.checkToken();
		this.setImages();
	}

	setImages = () => {
		const allImages = [];
		if (this.product.extra) {
			allImages.push(this.product.url);
			allImages.push(...this.product.extra.trim().split(' '));
			this.setState({ inventoryImages: allImages });
		} else {
			allImages.push(this.product.url);
			this.setState({ inventoryImages: allImages });
		}
	};

	// used to display images on the side column on lg screens, and on the bottom on sm screens
	displayExtraImages = (img, i) => {
		return (
			<div className="mb-3 mx-auto">
				<img
					src={img}
					alt={i}
					className="img-thumbnail img-fluid z-depth-1 extra-pointer"
					onClick={event => this.pictureMover(event, i)}
				/>
			</div>
		);
	};

	pictureMover = (event, i) => {
		const newImagesArray = [...this.state.inventoryImages];
		const newVariable = newImagesArray.splice(i, 1);
		newImagesArray.unshift(newVariable);
		this.setState({ inventoryImages: newImagesArray });
	};

	// css styles for the extra images
	respClasses = (leftCol, btmRow) => {
		const { inventoryImages } = this.state;
		const display = (offset = '') =>
			`col-12 ${
				inventoryImages.length > 1 ? 'col-lg-10' + offset : 'col-lg-12'
			} text-center`;

		if (leftCol) {
			return display();
		}

		if (btmRow) {
			return display(' offset-lg-2');
		}
	};

	render() {
		const { product } = this;
		const {
			inventoryImages,
			isAuthed,
			isAdmin,
			success,
			error,
			quantity
		} = this.state;

		return (
			<Container className="animated fadeInUpBig">
				<Row>
					{inventoryImages.length > 1 && (
						<Col className="col-lg-2 thumb-images d-none d-lg-block">
							{inventoryImages.map((a, i) => {
								if (i != 0) {
									return <div key={i}>{this.displayExtraImages(a, i)}</div>;
								}
							})}
						</Col>
					)}
					<Col className={this.respClasses(true, false)}>
						<h2 className="mt-5">{product.cardTitle}</h2>
						<img
							src={inventoryImages[0]}
							className="d-block img-fluid mx-auto my-5 z-depth-1 main-show"
							alt={product.cardTitle}
						/>{' '}
						<p style={{ fontSize: '20px' }}>{product.cardDesc}</p>
					</Col>
				</Row>
				<Row>
					<CardBody className="text-center col-12">
						{' '}
						<div className="col-md-12 border-bottom pb-3 pb-sm-3">
							{isAuthed &&
								product.cardPrice > 0 &&
								!isAdmin && (
									<Fragment>
										<Col className={this.respClasses(false, true)}>
											{this.selectElem(
												quantity,
												product.id,
												product.cardQuantity,
												product.cardPrice
											)}
											{this.resultMsg(success, error)}
											<CartValueContext.Consumer>
												{func =>
													this.submitBtn(product.id, product.cardQuantity, func)
												}
											</CartValueContext.Consumer>
										</Col>
									</Fragment>
								)}
						</div>
					</CardBody>
					{inventoryImages.length > 1 &&
						inventoryImages.map((a, i) => {
							if (i != 0) {
								return (
									<div key={i} className="col-3 px-2 d-lg-none">
										{this.displayExtraImages(a, i)}
									</div>
								);
							}
						})}
				</Row>
			</Container>
		);
	}
}

export default ShowPageComponentWrapper;
