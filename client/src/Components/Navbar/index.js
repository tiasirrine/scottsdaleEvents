import React, { Component, Fragment } from 'react';
import {
	Navbar,
	NavbarNav,
	Container,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'mdbreact';
import { Link } from 'react-router-dom';

import './navbar.css';

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isWideEnough: false,
			dropdownOpen: false,
			active: window.location.pathname
		};
		this.isAdmin = sessionStorage.getItem('isAdmin');
	}

	// sets the current url route to state
	componentDidUpdate() {
		if (this.state.active !== window.location.pathname) {
			this.setState({
				active: window.location.pathname
			});
		}
	}

	// clears sessions storage and logs a user out
	logout = () => sessionStorage.clear();

	// checks session storage and reveals cart and logout button
	checkLogIn = () => (sessionStorage.getItem('token') ? true : false);

	render() {
		const { href } = window.location;
		if (
			href.includes('/admin') ||
			href.includes('/dashboard') ||
			href.includes('/reset')
		) {
			return null;
		}

		return (
			<Navbar
				className="nav-flex"
				color="stylish-color"
				dark
				expand="xs"
				fixed="top"
				scrolling
			>
				<Container className="nav-flex">
					<div>
						<Link className="text-white navbar-brand" to="/">
							Scottsdale Event Dècor
						</Link>
					</div>
					<div>{this.props.cartTotal}</div>
					<div>
						<NavbarNav right>
							<NavItem>
								<NavLink
									className={`${this.state.active === '/' && 'activeTab'}`}
									to="/"
								>
									<span>Home</span>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={`${this.state.active.includes('inventory') &&
										'activeTab'}`}
									to="/inventory"
								>
									<span>Inventory</span>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={`${this.state.active === '/gallery' &&
										'activeTab'}`}
									to="/gallery"
								>
									<span>Gallery</span>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={`${this.state.active === '/contact' &&
										'activeTab'}`}
									to="/contact"
								>
									<span>Contact Us</span>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={`${this.state.active === '/about' && 'activeTab'}`}
									to="/about"
								>
									<span>About</span>
								</NavLink>
							</NavItem>
							{!this.checkLogIn() && (
								<NavItem>
									<NavLink
										className={`${this.state.active === '/login' &&
											'activeTab'}`}
										to="/login"
									>
										<span>Login</span>
									</NavLink>
								</NavItem>
							)}
							{this.checkLogIn() && (
								<Fragment>
									<NavItem>
										<Dropdown toggle={this.toggle}>
											<DropdownToggle nav caret>
												Hello, {sessionStorage.getItem('firstName')}
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem>
													<Link to="/profile">
														<i className="fa fa-dashboard" aria-hidden="true" />
														{'  '}
														Profile
													</Link>
												</DropdownItem>
												<DropdownItem>
													<Link to="/carts">
														{' '}
														<i
															className="fa fa-shopping-cart"
															aria-hidden="true"
														/>
														{'  '}
														My Carts
													</Link>
												</DropdownItem>
												<DropdownItem>
													<Link to="/estimates">
														{' '}
														<i
															className="fa fa-pencil-square"
															aria-hidden="true"
														/>
														{'  '}
														Past Estimates
													</Link>
												</DropdownItem>
												<DropdownItem>
													<Link to="/checkout/cart">
														{' '}
														<i
															className="fa fa-shopping-basket"
															aria-hidden="true"
														/>
														{'  '}
														Checkout
													</Link>
												</DropdownItem>
												<div className="dropdown-divider" />
												<DropdownItem>
													<Link to="/" onClick={this.logout}>
														{' '}
														<i className="fa fa-sign-out" aria-hidden="true" />
														{'  '}
														Logout
													</Link>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</NavItem>
								</Fragment>
							)}
						</NavbarNav>
					</div>
				</Container>
			</Navbar>
		);
	}
}
