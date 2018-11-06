import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';

import './AboutSection.css';

const someText = [
	`As a boutique rental company, our commitment to quality is second to
  none. From seeking out the best materials, to painstakingly
  handcrafting our items, our furniture grade rentals and pieces that
  most of our clients even want for their own homes! We provide the
  quality deserving of display in the finest resorts of the area.`,
	`It comes as no surprise that our commitment to service & quality has
  made us the industry choice many years running. Our clientele knows
  that when only the best will do, Scottsdale Event Decor is it!`,
	`From the initial email to the strike of the event, our team is
  committed to your satisfaction. Unlike other rental companies who
  just “drop” off the order, our crew is works with your onsite
  operations team to make sure everything gets to the right place and
  set in the right area. Bottom line, Scottsdale Event Decor gets the
  job done right.`
];

const textTitle = ['Quality', 'The Industry Choice', 'Service'];

class FeaturesPage extends Component {
	render() {
		return (
			<Container>
				<section className="my-5">
					<h2 className="h1-responsive font-weight-bold text-center my-5">
						What Sets Us Apart?
					</h2>
					<p className="lead grey-text w-responsive text-center mx-auto mb-5">
						Our collections have been handpicked and handcrafted with one
						specific goal in mind; to make your event look spectacular.
					</p>
					<Row>
						{someText.map((text, i) => (
							<Col key={i} md="4" className="md-0 mb-5">
								<h4 className="font-weight-bold text-center">{textTitle[i]}</h4>
								<p className="grey-text text-justify">{text}</p>
							</Col>
						))}
					</Row>
				</section>
			</Container>
		);
	}
}

export default FeaturesPage;
