import React, { Component, Fragment } from 'react';
import InventoryNav from '../../InventoryNav';
// import { UncontrolledCarousel } from 'reactstrap';
import './Home.css';

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

  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        <InventoryNav categories={categories} />
      </Fragment>
    );
  }
}

// <UncontrolledCarousel items={this.items} />
export default Home;

//http://via.placeholder.com/350x150
