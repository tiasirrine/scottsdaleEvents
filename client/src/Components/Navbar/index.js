// import './navbar.css';
// import React, { Component, Fragment } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import DropdownTab from './Dropdown';

// class Nav extends Component {
//   state = { active: window.location.pathname };

//   // sets the current url route to state
//   componentDidUpdate() {
//     if (this.state.active !== window.location.pathname) {
//       this.setState({
//         active: window.location.pathname
//       });
//     }
//   }

//   // sets the active class to the clicked nav button
//   onClick = e => this.setState({ active: e.target.name });

//   // clears sessions storage and logs a user out
//   logout = () => sessionStorage.clear();

//   // checks session storage and reveals cart and logout button
//   checkLogIn = () => (sessionStorage.getItem('token') ? true : false);

//   render() {
//     return (
//       <nav className="navbar navbar-expand-md navbar-dark">
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             Scottsdale Event Dècor
//           </Link>
//           <button
//             className="navbar-toggler ml-auto"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <div className="collapse navbar-collapse mr-auto" id="navbarNav">
//             <ul className="navbar-nav ml-auto">
//               <li data-toggle="collapse" data-target=".navbar-collapse.show">
//                 <Link
//                   name="/"
//                   to="/"
// className={`nav-link waves-effect waves-light ${this.state
//   .active === '/' && 'active'}`}
//                   onClick={this.onClick}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li data-toggle="collapse" data-target=".navbar-collapse.show">
//                 <Link
//                   name="/inventory"
//                   to="/inventory"
//                   className={`nav-link waves-effect waves-light ${window.location.href.includes(
//                     'inventory'
//                   ) && 'active'}`}
//                   onClick={this.onClick}
//                 >
//                   Inventory
//                 </Link>
//               </li>
//               <li data-toggle="collapse" data-target=".navbar-collapse.show">
//                 <Link
//                   name="/gallery"
//                   to="/gallery"
//                   className={`nav-link waves-effect waves-light ${this.state
//                     .active === '/gallery' && 'active'}`}
//                   onClick={this.onClick}
//                 >
//                   Gallery
//                 </Link>
//               </li>

//               {
//                 <li data-toggle="collapse" data-target=".navbar-collapse.show">
//                   <Link
//                     name="/contact"
//                     to="/contact"
//                     className={`nav-link waves-effect waves-light ${this.state
//                       .active === '/contact' && 'active'}`}
//                     onClick={this.onClick}
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//               }
//               {!this.checkLogIn() && (
//                 <li data-toggle="collapse" data-target=".navbar-collapse.show">
//                   <Link
//                     name="/login"
//                     to="/login"
//                     className={`nav-link waves-effect waves-light ${this.state
//                       .active === '/login' && 'active'}`}
//                     onClick={this.onClick}
//                   >
//                     Login
//                   </Link>
//                 </li>
//               )}
//               {this.checkLogIn() && (
//                 <Fragment>
//                   <li className="dropdown">
//                     <a
//                       className="nav-link dropdown-toggle"
//                       id="navbarDropdown"
//                       role="button"
//                       data-toggle="dropdown"
//                       aria-haspopup="true"
//                       aria-expanded="false"
//                     >
//                       Hello, {sessionStorage.getItem('firstName')}
//                     </a>
//                     <div
//                       className="dropdown-menu"
//                       aria-labelledby="navbarDropdown"
//                     >
//                       <Link to="/profile" className="dropdown-item">
//                         Profile
//                       </Link>
//                       <Link
//                         to="/cart"
//                         className={`nav-link waves-effect waves-light ${this
//                           .state.active === '/cart' && 'active'}`}
//                         onClick={this.onClick}
//                       >
//                         Cart
//                         {/*<i className="fa fa-shopping-cart" />*/}
//                       </Link>
//                       <div className="dropdown-divider" />
//                       <Link
//                         to="/"
//                         className="nav-link waves-effect waves-light"
//                         onClick={this.logout}
//                       >
//                         Logout
//                       </Link>
//                     </div>
//                   </li>
//                 </Fragment>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Nav;

import './navbar.css';
import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  Container,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'mdbreact';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      active: window.location.pathname
    };
    this.toggle = this.toggle.bind(this);
  }

  // sets the current url route to state
  componentDidUpdate() {
    if (this.state.active !== window.location.pathname) {
      this.setState({
        active: window.location.pathname
      });
    }
  }

  navbarToggler = () => this.setState({ collapse: !this.state.collapse });

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  // sets the active class to the clicked nav button
  onNavItemClick = e => this.setState({ active: e.target.name });

  // clears sessions storage and logs a user out
  logout = () => sessionStorage.clear();

  // checks session storage and reveals cart and logout button
  checkLogIn = () => (sessionStorage.getItem('token') ? true : false);

  render() {
    const { href } = window.location;
    if (href.includes('/admin') || href.includes('/dashboard')) {
      return null;
    }
    return (
      <Navbar color="stylish-color" dark expand="md" fixed="top" scrolling>
        <Container>
          <Link className="text-white navbar-brand" to="/">
            Scottsdale Event Dècor
          </Link>
          {!this.state.isWideEnough && (
            <NavbarToggler onClick={this.navbarToggler} />
          )}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav right>
              <NavItem>
                <NavLink to="/">
                  <span
                    className={`${this.state.active === '/' && 'activeTab'}`}
                  >
                    Home
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/inventory">
                  <span
                    className={`${this.state.active.includes('inventory') &&
                      'activeTab'}`}
                  >
                    Inventory
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/gallery">
                  <span
                    className={`${this.state.active === '/gallery' &&
                      'activeTab'}`}
                  >
                    Gallery
                  </span>
                </NavLink>
              </NavItem>
              {!this.checkLogIn() && (
                <NavItem>
                  <NavLink to="/login">
                    <span
                      className={`${this.state.active === '/login' &&
                        'activeTab'}`}
                    >
                      Login
                    </span>
                  </NavLink>
                </NavItem>
              )}
              {this.checkLogIn() && (
                <NavItem>
                  <Dropdown toggle={this.toggle}>
                    <DropdownToggle nav caret>
                      Hello, {sessionStorage.getItem('firstName')}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/cart">Cart</Link>
                      </DropdownItem>
                      <div className="dropdown-divider" />
                      <DropdownItem>
                        <Link to="/" onClick={this.logout}>
                          Logout
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              )}
            </NavbarNav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
