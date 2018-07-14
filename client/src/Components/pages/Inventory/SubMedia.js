import React, { Component, Fragment } from 'react';
import { Media } from 'reactstrap';
import images from './Images';
import './InventoryPage.css';

class SubMedia extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <Media href={images[0]}>
        <Media object data-src={images[0]} alt="placeholder image" />
      </Media>
    );
  }
}

export default SubMedia;
