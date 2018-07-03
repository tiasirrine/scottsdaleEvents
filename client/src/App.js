import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from './components/Checkout';
import Home from './components/Pages/Home/Home';
import Services from "./components/Pages/Services/Services";
// import Nav from './components/Nav/Nav';
import Login from './components/Pages/Login';
// import Admin from './components/Pages/Admin';
// import PrivateRoute from './components/PrivateRoute';
// import API from './api/API';

class App extends React.Component {
  state = { isAuthed: false };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.checkUser(this.state)
  //     .then(res => this.setState({ isAuthed: true }))
  //     .catch(err => console.log(err));
  // };

  render() {
    const state = this.state;
    console.log(state);
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Services" component={Services} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/checkout">
              <StripeProvider apiKey="pk_test_0I6cwW4VHLLkWbRqP53QRu8A">
                <Checkout />
              </StripeProvider>
            </Route>
            {/*<PrivateRoute
              path="/admin"
              render={props => (
                <Admin {...props} isAuthed={this.state.isAuthed} />
              )}
            />*/}
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}


export default App;
