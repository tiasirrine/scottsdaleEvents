import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Nav = () => (
  <nav className="navbar navbar-expand navbar-light bg-light top-nav">
    <div className="container flex-column flex-md-row">
      <Link to="/" className="navbar-brand">
        Scottsdale Events
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/saved" className="nav-link">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/saved" className="nav-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/saved" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;
