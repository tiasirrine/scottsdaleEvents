import React, { Component, Fragment } from 'react';
import API from '../../../api/API';
import InventoryCard from '../../../Components/InventoryCard';

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
      route: this.props.match.params.category,
      categoryItems: this.loadCategoryProducts(this.props.match.params.category)
    });
  }

  componentDidUpdate(prevProps) {
    // console.log(
    //   'thisProps',
    //   this.props.match.params.category,
    //   'prevProps:',
    //   prevProps.match.params.category
    // );
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.setState({
        route: this.props.match.params.category,
        categoryItems: this.loadCategoryProducts(this.props.match.params.category)
      });
    }
  }

  render() {
    console.log('STATE:', this.state);
    const { categoryItems } = this.state;
    // console.log('CategoryProduct STATE:', this.state);
    return (
      <Fragment>
        <InventoryCard item={this.props.match.params.category} indItem={'map into here'} />
        {/* <div>Inventory Items for {this.props.match.params.category}</div> */}
        {/* {categoryItems ? categoryItems.map(a => <p key={a}>{a}</p>) : null} */}
      </Fragment>
    );
  }
}

export default CategoryProduct;
