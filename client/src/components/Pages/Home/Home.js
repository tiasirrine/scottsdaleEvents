import React from 'react';
import './Home.css';
import Slider from '../../Slider/Slider';
import Banner from '../../Banner/Banner';
import About from '../../About/About';
import Service from '../../Service/Service';
import Portfolio from '../../Portfolio/Portfolio';
import Testimonial from '../../Testimonials/Testimonial';

const Home = props => (
  <div>
    <Slider>
      <Banner />
    </Slider>
    <About />
    <Service />
    <Portfolio />
    <Testimonial />

  </div>
);

export default Home;
