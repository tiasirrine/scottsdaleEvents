import './Home.css';
import React, { Component, Fragment } from 'react';

import CarouselPage from './Carousel/index';
import EcommercePage from './Ecommerce/Ecommerce';
import FeaturesPage from './AboutSection/AboutSection';

class Home extends Component {
	items = [
		{
			src: 'http://via.placeholder.com/1000x400',
			altText: 'Slide 1',
			caption: 'Slide 1',
			header: 'Slide 1 Header'
		},
		{
			src: 'http://via.placeholder.com/1000x400',
			altText: 'Slide 2',
			caption: 'Slide 2',
			header: 'Slide 2 Header'
		},
		{
			src: 'http://via.placeholder.com/1000x400',
			altText: 'Slide 3',
			caption: 'Slide 3',
			header: 'Slide 3 Header'
		}
	];

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<Fragment>
				<CarouselPage />
				<EcommercePage />
				<FeaturesPage />
			</Fragment>
		);
	}
}
export default Home;
