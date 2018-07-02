import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";
import Checkout from "./components/Checkout";
import Home from "./components/Pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Login from './components/Pages/Login/Login';

const App = () => (
  <Router>
    <Switch>
      <Nav />
      <Route exact path="/" component={Home} />
      <Route exact path="/adminlogin" component={Login} />
      <Route exact path="/checkout">
        <StripeProvider apiKey="pk_test_0I6cwW4VHLLkWbRqP53QRu8A">
          <Checkout />
        </StripeProvider>
      </Route>
    </Switch>
  </Router>
);

export default App;
