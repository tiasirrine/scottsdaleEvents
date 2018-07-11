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

  // loads the inventory items based on the category.
  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const arr = result.data.map(index => index['NAME']);
        return this.setState({ categoryItems: arr });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: '500 (Internal Server Error)' });
      });
  };

  componentWillMount() {
    this.setState({
      route: this.props.match.params.category,
      categoryItems: this.loadCategoryProducts(this.props.match.params.category)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.setState({
        route: this.props.match.params.category,
        categoryItems: this.loadCategoryProducts(
          this.props.match.params.category
        )
      });
    }
  }

  render() {
    const { categoryItems, error } = this.state;
    return (
      <Fragment>
        <div>Inventory Items for {this.props.match.params.category}</div>
        {categoryItems ? categoryItems.map(a => <p key={a}>{a}</p>) : null}
        {error ? <h3 className="text-center">{error}</h3> : null}
      </Fragment>
    );
  }
}

export default CategoryProduct;
