// import './dashboard.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Profile from './Profile';

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    // return <AdminSidebar />;
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={props => <AdminSidebar {...props} mainContent={Profile} />}
          />
        </Switch>
      </Fragment>
    );
  }
}
export default Dashboard;
