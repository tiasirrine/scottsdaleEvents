import './InventoryPage.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import API from '../../../api/API';
import image from '../../../images/Photos/Bars/bar10.jpg';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';
import Sidebar from './Sidebar';

class InventoryPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories, inventoryObj, subCategories } = this.props;
    return (
      <Fragment>
        <div className="flex">
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
