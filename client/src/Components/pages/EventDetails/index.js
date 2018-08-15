import './EventDetails.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import EventForm from './EventForm';
import { Container } from 'mdbreact';

// The main functionality of this component is to render the specified routes for the inventory
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

class EventDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="flex">
        <Container fluid className="ml-270">
          <Switch>
            <Route exact path={this.props.match.path} render={props => <EventForm {...props} />} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default EventDetailPage;
