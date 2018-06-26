import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from './components/Checkout';

const App = () => (
  <StripeProvider apiKey="pk_test_63B6U6fyy3YHlyn9mo2XR2lA">
    <Checkout />
  </StripeProvider>
);

export default App;
