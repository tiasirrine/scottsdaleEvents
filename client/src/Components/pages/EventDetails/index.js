import './EventDetails.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import EventForm from './EventForm';
import { Container } from 'mdbreact';

// The main functionality of this component is to render the specified routes for the Events
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/eventdetails" render={props => <EventForm {...props} />} />
      </Switch>
    );
  }
}

export default EventDetails;
