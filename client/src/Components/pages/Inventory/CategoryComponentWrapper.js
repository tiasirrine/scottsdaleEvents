import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, Col, Row, View } from 'mdbreact';

const CategoryComponentWrapper = props => {
	const { categories, images } = props;

	return (
		<Row>
			{categories &&
				categories.map((a, i) => (
					<Col xs="12" md="6" xl="4" key={a} className="">
						<Card className="card-cascade wider reverse mt-4 mb-2 animated fadeInUpBig img-width">
							<Link to={`/inventory/${a}`}>
								<div className="view view-cascade overlay">
									<View zoom>
										<CardImage
											cascade
											src={images[i]}
											className="ind-card-image card-image"
											alt="Category Image"
										/>
										<div className="mask flex-center waves-effect waves-light cat-names text-justify" />
									</View>
								</div>
							</Link>
						</Card>
						<Link to={`/inventory/${a}`}>
							<figcaption className="figure-caption text-center animated fadeInUpBig fig-size">
								{a}
							</figcaption>
						</Link>
					</Col>
				))}
		</Row>
	);
};

export default CategoryComponentWrapper;
