import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Home />
        </Fragment>
      </Router>
    );
  }
}

export default App;
