// import './dashboard.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Profile from './Profile';
import CreateCustomer from './CreateCustomer';
import API from '../../../api/API';

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  decodedToken = () => API.decodeToken();

  render() {
    if (!this.decodedToken()) {
      return (
        <Redirect
          to={{
            pathname: '/admin',
            state: { msg: 'Your session has expired' }
          }}
        />
      );
    }
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={props => (
              <AdminSidebar
                {...props}
                mainContent={<Profile user={this.decodedToken().result} />}
              />
            )}
          />
          <Route
            exact
            path="/dashboard/create/customer"
            render={props => (
              <AdminSidebar {...props} mainContent={<CreateCustomer />} />
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}
export default Dashboard;
