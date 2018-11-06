import React from 'react';
import { Container, Row, Col, Card } from 'mdbreact';

const images = [
	'https://s3-us-west-2.amazonaws.com/scottsdaleevents/home/10011012.jpg',
	'https://s3-us-west-2.amazonaws.com/scottsdaleevents/home/10011004.jpg',
	'https://s3-us-west-2.amazonaws.com/scottsdaleevents/home/10041013+(1).jpg',
	'https://s3-us-west-2.amazonaws.com/scottsdaleevents/home/10011008A.jpg'
];

const descriptions = [
	'Special Request',
	'Premium Display Shelving',
	'Wood Tables',
	'Custom Bars'
];

const style = { maxWidth: '320px', maxHeight: '510px' };

const EcommercePage = () => {
	return (
		<Container>
			<section className="text-center my-5">
				<h2 className="h1-responsive font-weight-bold text-center my-5">
					Our Bestsellers
				</h2>
				<p className="grey-text text-center w-responsive mx-auto mb-5">
					At Scottsdale Event Decor we are proud to deliver premium quality
					rental items that are designed and manufactured locally in our
					warehouse.
				</p>
				<Row>
					{images.map((image, i) => (
						<Col key={i} xs="12" lg="3" md="6" className="mb-lg-0 mb-4">
							<Card
								style={style}
								collection
								className="z-depth-1-half mx-auto mx-md-3"
							>
								<div className="view">
									<img src={image} className="img-fluid" alt="" />
									<div className="stripe dark">
										<a>
											<p>{descriptions[i]}</p>
										</a>
									</div>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</section>
		</Container>
	);
};

export default EcommercePage;
