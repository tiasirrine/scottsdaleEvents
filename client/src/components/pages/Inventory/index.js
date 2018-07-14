import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';
import SubCategoryProduct from './SubCategoryProduct';
import InventoryNav from '../../InventoryNav';
import './InventoryCard';

class InventoryPage extends Component {
  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        <InventoryNav categories={categories} />
        {/* <Route path="/inventory/:category" component={CategoryProduct} /> */}

        <Route path="/inventory/:category" component={SubCategoryProduct} />
      </Fragment>
    );
  }
}

export default InventoryPage;
//under navbar, display image and cateoggry name, 1 for each cat
//click 1, go to /inventory/:sub
