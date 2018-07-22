import './navbar.css';
import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../api/auth';
import API from '../../api/API';

class Nav extends Component {
  state = { active: window.location.pathname };

  onClick = e => {
    this.setState({ active: e.target.name });
  };

  componentDidUpdate() {
    if (this.state.active !== window.location.pathname) {
      this.setState({
        active: window.location.pathname
      });
    }
  }

  logout = () => sessionStorage.clear();

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark top-nav">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Scottsdale Events
          </Link>
          <button
            className="navbar-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse mr-auto" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link
                  name="/"
                  to="/"
                  className={`nav-link waves-effect waves-light ${this.state
                    .active === '/' && 'active'}`}
                  onClick={this.onClick}
                >
                  Home
                </Link>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link
                  name="/inventory"
                  to="/inventory"
                  className={`nav-link waves-effect waves-light ${this.state
                    .active === '/inventory' && 'active'}`}
                  onClick={this.onClick}
                >
                  Inventory
                </Link>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link
                  name="/gallery"
                  to="/gallery"
                  className={`nav-link waves-effect waves-light ${this.state
                    .active === '/gallery' && 'active'}`}
                  onClick={this.onClick}
                >
                  Gallery
                </Link>
              </li>
              <li data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link
                  name="/about"
                  to="/about"
                  className={`nav-link waves-effect waves-light ${this.state
                    .active === '/about' && 'active'}`}
                  onClick={this.onClick}
                >
                  About Us
                </Link>
              </li>
              {
                <li data-toggle="collapse" data-target=".navbar-collapse.show">
                  <Link
                    name="/contact"
                    to="/contact"
                    className={`nav-link waves-effect waves-light ${this.state
                      .active === '/contact' && 'active'}`}
                    onClick={this.onClick}
                  >
                    Contact Us
                  </Link>
                </li>
              }
              {!auth.isAuthed() && (
                <li data-toggle="collapse" data-target=".navbar-collapse.show">
                  <Link
                    name="/login"
                    to="/login"
                    className={`nav-link waves-effect waves-light ${this.state
                      .active === '/login' && 'active'}`}
                    onClick={this.onClick}
                  >
                    Login
                  </Link>
                </li>
              )}
              {auth.isAuthed() && (
                <Fragment>
                  <li
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <Link
                      to="/"
                      className="nav-link waves-effect waves-light"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                  </li>
                  <li
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <Link
                      name="/cart"
                      to="/cart"
                      className={`nav-link waves-effect waves-light ${this.state
                        .active === '/cart' && 'active'}`}
                      onClick={this.onClick}
                    >
                      <i className="fa fa-shopping-cart" />
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
