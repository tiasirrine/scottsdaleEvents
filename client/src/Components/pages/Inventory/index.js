import './InventoryPage.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import image from '../../../images/Photos/Bars/bar10.jpg';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';
import Sidebar from './Sidebar';
import { Container } from 'mdbreact';

// The main functionality of this component is to render the specified routes for the inventory
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

class InventoryPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { categories, inventoryObj, subCategories } = this.props;

    const categoryImgs =
      categories && inventoryObj
        ? categories.map(a => inventoryObj[a][0].url)
        : null;

    return (
      <div className="flex">
        <Sidebar subCategories={subCategories} />
        <Container fluid className="ml-270">
          <Switch>
            <Route
              exact
              path={this.props.match.path}
              render={props => (
                <CategoryComponentWrapper
                  {...props}
                  categories={categories}
                  images={categoryImgs}
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
        </Container>
      </div>
    );
  }
}

export default InventoryPage;
