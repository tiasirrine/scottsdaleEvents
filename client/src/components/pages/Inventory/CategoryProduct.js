import React, { Component, Fragment } from 'react';
import API from '../../../api/API';

class CategoryProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: this.props.match.params.category,
      categoryItems: null
    };
  }

  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const arr = result.data.map(index => index['NAME']);
        console.log(arr);
        return this.setState({ categoryItems: arr });
      })
      .catch(error => console.log('ERROR:', error));
  };

  componentWillMount() {
    this.setState({
      categoryItems: this.loadCategoryProducts(this.state.route)
    });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }

  render() {
    const { route, categoryItems } = this.state;
    console.log('CategoryProduct STATE:', route);
    return (
      <Fragment>
        <div>Inventory Items for {route}</div>
        {categoryItems ? categoryItems.map(a => <p key={a}>{a}</p>) : null}
      </Fragment>
    );
  }
}

export default CategoryProduct;
