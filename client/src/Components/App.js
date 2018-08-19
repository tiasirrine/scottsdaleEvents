import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import API from '../api/API';
import Gallery from './pages/Gallery';
import ContactPage from './pages/Contact/Form/index';
import Login from './pages/Login';
import Admin from './pages/Admin';

import Footer from './Footer/Footer';
import PrivateRoute from './PrivateRoute';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

import Checkout from './pages/Checkout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryObj: null,
      subCategories: null,
      hideNavAndFooter: false,
      hideNav: false
    };
  }

  componentDidMount() {
    // this attaches the click event to the main content area to close
    // the navbar on an outside click, if the navbar is small and opened
    document.addEventListener('click', this.domClick, false);
    this.setState({ inventoryObj: this.loadProducts() });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.domClick);
  }

  loadProducts = () => {
    API.getProducts()
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
        const categories = Object.keys(inventoryObj);

        categories.forEach(a => {
          subCategories[a] = [
            ...new Set(inventoryObj[a].map(b => b.subcategory))
          ];
        });

        return this.setState({ inventoryObj, subCategories, categories });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  // this will be passed into navbar if a user
  // clicks outside the navbar while it is small and opened
  // It will update the navbar state to collapse it
  hideNav = () => this.setState({ hideNav: true });

  // this is used to close the navbar when it is small, and expanded.
  // closes the navbar when you click the main content area
  domClick = e => {
    const { href } = window.location;
    if (href.includes('/admin') || href.includes('/dashboard')) {
      return false;
    }
    if (this.node.contains(e.target)) {
      const el = document.getElementsByClassName('navbar-collapse')[0];
      const testEl = el.classList.contains('show');
      if (testEl) {
        this.setState({ hideNav: true });
      }
    }
  };

  render() {
    const { categories, subCategories, inventoryObj } = this.state;
    return (
      <Router>
        <Fragment>
          <Navbar collapse={this.state.hideNav && this.state.hideNav} />
          <div ref={node => (this.node = node)} className="main-height">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/inventory"
                render={props => (
                  <InventoryPage
                    {...props}
                    categories={categories}
                    subCategories={subCategories}
                    inventoryObj={inventoryObj}
                  />
                )}
              />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/admin"
                render={props => <Admin {...props} Component={Login} />}
              />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route component={Home} />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
