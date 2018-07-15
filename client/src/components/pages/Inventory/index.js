import './InventoryPage.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import InventoryNav from '../../InventoryNav';
import API from '../../../api/API';
import image from '../../../images/Photos/Bars/bar10.jpg';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';

class InventoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { inventoryObj: null };
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
        return this.setState({ inventoryObj });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log('STATE:', this.state);
    const { categories } = this.props;
    const { inventoryObj } = this.state;
    return (
      <Fragment>
        <InventoryNav categories={categories} />
        <Switch>
          <Route
            exact
            path={this.props.match.path}
            render={props => (
              <CategoryComponentWrapper
                {...props}
                categories={categories}
                inventory={inventoryObj}
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
      </Fragment>
    );
  }
}

export default InventoryPage;
//under navbar, display image and cateoggry name, 1 for each cat
//click 1, go to /inventory/:sub

// <Route
//   exact
//   path={`${this.props.match.path}/:category`}
//   render={props => (
//     <Wrapper
//       {...props}
//       categories={categories}
//       inventory={this.state.inventoryObj}
//       image={image}
//       Item={Item}
//     />
//   )}
//  />
