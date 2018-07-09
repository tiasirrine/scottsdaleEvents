import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';

class InventoryPage extends Component {
  render() {
    return (
      <Fragment>
        <h2>This is the inventory page!</h2>

        <Route path="/inventory/:product" component={CategoryProduct} />
      </Fragment>
    );
  }
}

export default InventoryPage;
