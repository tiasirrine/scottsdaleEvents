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

// gets the screen size from the window object
const mql = window.matchMedia(`(min-width: 992px)`);

class InventoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpen: false, docked: false };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    mql.addListener(this.mediaQueryChanged);
    this.mediaQueryChanged();
  }

  // removes the match media listener when the component unmounts
  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  openSidebarOverlay = () => {
    if (this.state.sidebarOpen === false) {
      this.setState({ sidebarOpen: true });
    } else {
      this.setState({ sidebarOpen: false });
    }
  };

  // if the screen size greater than or equal to the size set in mql,
  //  open the sidebar, and dock it (fix in place)
  // otherwise, close it, and do not dock it (display it as an overlay)
  mediaQueryChanged = () => {
    return mql.matches
      ? this.setState({ sidebarOpen: true, docked: true })
      : this.setState({ sidebarOpen: false, docked: false });
  };

  // used to close the sidebar when an event click occurs outside of it while it is undocked, and opened
  eventClick = e => {
    // this is the name of the class of the clicked element outside the nav bar
    const target = e.target.getAttribute('class');
    // if it isn't the open icon, and sidebar is open, and its undocked,
    // then close the sidebar
    if (
      target !== 'fa fa-bars icon' &&
      this.state.sidebarOpen &&
      !this.state.docked
    ) {
      this.setState({ sidebarOpen: false });
    }
  };

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
        <Container onClick={this.eventClick} fluid className="ml-270">
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
