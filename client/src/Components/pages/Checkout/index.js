import './Checkout.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import EventForm from './EventForm';
import Cart from './Cart';
import Summary from './Summary';

// The main functionality of this component is to render the specified routes for the Events
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

class Checkout extends Component {
  render() {
    return (
      <div style={{ marginTop: '120px' }}>
        <Switch>
          <Route
            exact
            path="/checkout/event"
            render={props => <EventForm {...props} />}
          />
          <Route exact path="/checkout/cart" render={props => <Cart {...props} />} />
          <Route
            exact
            path="/checkout/summary"
            render={props => <Summary {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Checkout;
