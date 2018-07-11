import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';
import InventoryNav from '../../InventoryNav';
import './InventoryCard';

class InventoryPage extends Component {
  render() {
    const { categories } = this.props;
    console.log('IP T.P', this.props);
    return (
      <Fragment>
        <InventoryNav categories={categories} />
        <Route path="/inventory/:category" component={CategoryProduct} />
      </Fragment>
    );
  }
}

export default InventoryPage;
