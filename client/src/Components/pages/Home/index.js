import './Home.css';
import React, { Component, Fragment } from 'react';
import CarouselPage from './Carousel/index';
import EcommercePage from './Ecommerce/Ecommerce';
import FeaturesPage from './AboutSection/AboutSection';

class Home extends Component {
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
