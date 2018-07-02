import React from "react";
import "./Nav.css";

const Nav = props => (
  <div>
    <div id="loader-wrapper">
      <div id="loader" />
      <div class="loader-section section-left" />
      <div class="loader-section section-right" />
    </div>
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light">
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
              <a
                className="navbar-brand"
                href="#"
                img
                src="images/logo.png"
                alt=""
              />
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link active" data-scroll href="#intro">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-scroll href="#service">
                      service
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-scroll href="#portfolio">
                      Portfolio
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-scroll href="#resume">
                      Resume
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-scroll href="#contact">
                      contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="social-icon">
                <ul className="social-icon">
                  <li>
                    <a className="twitter" href="#">
                      <i className="fab fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <i className="fab fa-behance" />
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a className="youtube" href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </div>
              <a className="btn hire" href="">
                Hire Me<i className="fas fa-paper-plane" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default Nav;
