import React, { Component, Fragment } from 'react';
import './Home.css';
// import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link active dropdown-toggle"
              data-toggle="collapse"
              aria-expanded="false"
              href="#furniture-sub-menu"
            >
              Furniture
            </a>
            <ul
              class="collapse list-unstyled sub-category"
              id="furniture-sub-menu"
            >
              <li>
                <a>Sub Category</a>
              </li>
              <li>
                <a>Sub Category</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link active dropdown-toggle"
              data-toggle="collapse"
              aria-expanded="false"
              href="#bars-sub-menu"
            >
              Bars
            </a>
            <ul class="collapse list-unstyled sub-category" id="bars-sub-menu">
              <li>
                <a>Sub Category</a>
              </li>
              <li>
                <a>Sub Category</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
