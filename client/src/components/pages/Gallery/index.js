import React, { Component, Fragment } from 'react';
import InventoryCard from '../../InventoryCard';

class Gallery extends Component {
  render() {
    // const { categories } = this.props;
    return (
      <Fragment>
        {/* <InventoryNav categories={categories} /> */}
        <InventoryCard />
      </Fragment>
    );
  }
}

export default Gallery;