import React, { Component } from 'react';

class CategoryProduct extends Component {
  state = { categoryItems: null };

  loadCategoryProducts = () => {
    // const { product } = this.props.match.params;
    // API.getCategoryProducts(product);
  };

  render() {
    return <div>Inventory Items for {this.props.match.params.product}</div>;
  }
}

export default CategoryProduct;
