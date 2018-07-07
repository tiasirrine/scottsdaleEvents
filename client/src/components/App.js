import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import API from './api/API';
import Navbar from './layouts/Navbar';

class App extends Component {
  state = {};

  render() {
    const state = this.state;
    console.log(state);
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>{}</Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
