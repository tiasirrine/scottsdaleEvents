import './InventoryPage.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';
import Sidebar from './Sidebar';
import { Container } from 'mdbreact';

// The main functionality of this component is to render the specified routes for the inventory
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

const mql = window.matchMedia(`(min-width: 992px)`);

class InventoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpen: false };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    mql.addListener(this.mediaQueryChanged);
    this.mediaQueryChanged();
  }

  openSidebarOverlay = () => {
    if (this.state.sidebarOpen === false) {
      this.setState({ sidebarOpen: true });
    } else {
      this.setState({ sidebarOpen: false });
    }
  };

  mediaQueryChanged = () =>
    mql.matches
      ? this.setState({ sidebarOpen: true })
      : this.setState({ sidebarOpen: false });

  render() {
    const { categories, inventoryObj, subCategories } = this.props;

    const categoryImgs =
      categories && inventoryObj
        ? categories.map(a => inventoryObj[a][0].url)
        : null;

    return (
      <div className="d-lg-flex">
        <Sidebar
          sidebarOpen={this.state.sidebarOpen}
          subCategories={subCategories}
        />
        <Container fluid className="ml-270">
          <div className="open-sidebar">
            <i onClick={this.openSidebarOverlay} className="fa fa-bars icon" />
          </div>
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
