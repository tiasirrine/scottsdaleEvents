import React from 'react';
import './Home.css';
import Slider from '../../Slider/Slider';
import Banner from '../../Banner/Banner';
import About from '../../About/About';
import Gallery from '../../Gallery/Gallery';
import Testimonial from '../../Testimonial/Testimonial';
import Footer from '../../Footer/Footer';

const Home = props => (
  <div>
    <Slider>
      <Banner />
    </Slider>
    <About />
    <Gallery />
    <Testimonial />
    <Footer />
  </div>
);

export default Home;
