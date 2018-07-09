import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import Inventory from './pages/Inventory';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/inventory" component={Inventory} />
            <Route component={Home} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;

// <Route path='/inventory' component={inventory}/>
