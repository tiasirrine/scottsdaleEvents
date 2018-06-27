import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from './components/Checkout';
require('dotenv').config();

const App = () => (
  <StripeProvider apiKey="pk_test_0I6cwW4VHLLkWbRqP53QRu8A">
    <Checkout />
  </StripeProvider>
);

export default App;
