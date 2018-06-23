import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Banner from './components/Banner';
// import Nav from './components/Nav';
// import Footer from './components/Footer';

const App = () => (
  <Router>
    <Fragment>
      {/*render global components like navbar*/}
      <Switch>{/* use react router to render components */}</Switch>
      {/*render global components like footer*/}
    </Fragment>
  </Router>
);

export default App;
