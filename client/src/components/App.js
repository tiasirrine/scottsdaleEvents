import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import API from '../api/API';
import Gallery from './pages/Gallery';
import ContactUs from './pages/Contact/Form/index';
import CustomerLogin from './pages/CustomerLogin';
// import AboutPage from './pages/About';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  constructor(props) {
    super(props);
    this.categories = this.loadCategories();
    this.state = { categories: [] };
  }

  // loads the inventory categories for the nav bar
  loadCategories = () => {
    return API.getDistinctCategories()
      .then(result => {
        const arr = result.data.map(index => index['category']);
        return this.setState({ categories: arr });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: '500 (Internal Server Error)' });
      });
  };

  render() {
    const { categories } = this.state;

    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props} categories={categories} />}
            />
            <Route
              path="/inventory"
              render={props => (
                <InventoryPage {...props} categories={categories} />
              )}
            />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/login" component={CustomerLogin} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/cart" component={ShoppingCart} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
