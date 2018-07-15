import './InventoryPage.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import InventoryNav from '../../InventoryNav';
import API from '../../../api/API';
import image from '../../../images/Photos/Bars/bar10.jpg';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';
import Sidebar from './Sidebar';

class InventoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { inventoryObj: null, subCategories: null };
  }

  componentDidMount() {
    this.setState({
      inventoryObj: this.loadCategoryProducts()
    });
  }

  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const { data } = result;
        // will hold filtered data
        const inventoryObj = {};

        // loops through each inventory item
        // creates a unique key on the inventoryObj object based on the inventory category
        // each value is an array of objects
        // each index in the array is the unique inventory item
        data.forEach(value => {
          // declare the variables
          let category, rest;

          // destructure so that category and the rest of the values are split apart
          ({ category, ...rest } = value);

          // checks if the category has been created, if not, creates the key
          if (!inventoryObj[value['category']]) {
            // creates an object to hold the first value
            const obj = {};

            // each key value is an array of objects. puts the first object inside the array
            inventoryObj[value['category']] = [(obj[category] = rest)];
          } else {
            // runs when a category already exists.
            // adds the inventory item to the array for its unique category
            inventoryObj[value['category']].push(rest);
          }
        });

        // will hold the unique sub categories for each category
        const subCategories = {};

        // gets the keys (categories) from inventoryObj
        // creates a key on subCategories for each category
        // each value is an array of sub categories.
        Object.keys(inventoryObj).forEach(a => {
          subCategories[a] = [
            ...new Set(inventoryObj[a].map(b => b.subcategory))
          ];
        });

        return this.setState({ inventoryObj, subCategories });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log('STATE:', this.state);
    const { categories } = this.props;
    const { inventoryObj, subCategories } = this.state;
    return (
      <Fragment>
        <InventoryNav categories={categories} />
        <div className="d-flex align-items-stretch">
          <Sidebar subCategories={subCategories} />

          <Switch>
            <Route
              exact
              path={this.props.match.path}
              render={props => (
                <CategoryComponentWrapper
                  {...props}
                  categories={categories}
                  image={image}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}/:category`}
              render={props => (
                <SubCategoryComponentWrapper
                  {...props}
                  inventory={inventoryObj}
                  image={image}
                />
              )}
            />
            <Route
              exact
              path={`${this.props.match.path}/:category/:subcategory`}
              render={props => (
                <InventoryComponentWrapper
                  {...props}
                  inventory={inventoryObj}
                  image={image}
                />
              )}
            />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default InventoryPage;
