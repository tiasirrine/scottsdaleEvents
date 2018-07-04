import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { StripeProvider } from 'react-stripe-elements';
// import Checkout from './components/Checkout';
import Home from './components/Pages/Home';
import Services from './components/Pages/Services';
// import Nav from './components/Nav';
import Login from './components/Pages/Login';
import Admin from './components/Pages/Admin';
import PrivateRoute from './components/PrivateRoute';
import API from './api/API';

class App extends React.Component {
  state = {};

  handleLoginFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    API.checkUser({ username, password })
      .then(res => {
        if (res.data === true) {
          sessionStorage.setItem('isAuthed', true);
          sessionStorage.setItem('userName', this.state.username);
          this.setState({ isAuthed: true });
        } else {
          sessionStorage.setItem('isAuthed', false);
          this.setState({ isAuthed: false });
        }
      })
      .catch(() => {
        sessionStorage.setItem('isAuthed', false);
        this.setState({ isAuthed: false });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentWillMount() {
    this.setState({ isAuthed: sessionStorage.isAuthed });
  }

  render() {
    const state = this.state;
    console.log(state);
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Services" component={Services} />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  isAuthed={state.isAuthed}
                  checkAuth={this.handleLoginFormSubmit}
                  inputChange={this.handleInputChange}
                />
              )}
            />
            <PrivateRoute
              path="/admin"
              isAuthed={this.state.isAuthed}
              component={Admin}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

/*<PrivateRoute
              path="/admin"
              render={props => (
                <Admin {...props} isAuthed={this.state.isAuthed} />
              )}
            />*/

// <Route exact path="/checkout">
//   <StripeProvider apiKey="pk_test_0I6cwW4VHLLkWbRqP53QRu8A">
//     <Checkout />
//   </StripeProvider>
// </Route>
