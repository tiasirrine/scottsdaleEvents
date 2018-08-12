// import './dashboard.css';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Profile from './Profile';
import API from '../../../api/API';

class Dashboard extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  decodedToken = () => API.decodeToken();

  render() {
    // return <AdminSidebar />;
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={props => (
              <AdminSidebar
                {...props}
                mainContent={Profile}
                user={this.decodedToken().result}
              />
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}
export default Dashboard;
