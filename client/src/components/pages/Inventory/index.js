import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';
import InventoryNav from '../../InventoryNav';

class InventoryPage extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        <InventoryNav categories={categories} />
        <h2>This is the inventory page!</h2>
        <Route path="/inventory/:category" component={CategoryProduct} />
      </Fragment>
    );
  }
}

export default InventoryPage;
