import axios from 'axios';

const wait = 15000;
const timeout = { timeout: wait };

const setOptions = () => {
	return {
		timeout: wait,
		headers: {
			Authorization: 'Bearer ' + sessionStorage.getItem('token')
		}
	};
};

export default {
	// called in App.js
	getProducts: function() {
		return axios.get('/get/products', timeout);
	},

	// called in the shopping cart
	getEstimate: function(values) {
		return axios.post('/create/estimate', values, setOptions());
	},

	// called in Profile, and Cart.js
	getCarts: function() {
		return axios.get('/get/carts', setOptions());
	},

	// called in Profile, and Cart.js
	getCart: function(cartId) {
		return axios.post('/get/cart', { cartId }, setOptions());
	},

	// Called in Dashboard/ViewUser
	getCustomers: function() {
		return axios.get('/get/customers', setOptions());
	},

	// Called in Dashboard/ViewUser
	getAdmins: function() {
		return axios.get('/get/admins', setOptions());
	},

	getEstimates: function(CustomerId) {
		return axios.post('/get/estimates', { CustomerId }, setOptions());
	},

	// used to display the add to cart button and to check if the admin, login and cart page can be displayed
	checkToken: function() {
		return axios.get('/auth/token', setOptions());
	},

	// used to get info about the user from the token
	decodeToken: function() {
		const token = sessionStorage.getItem('token');
		let userObj;
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			userObj = JSON.parse(window.atob(base64));
		} catch (e) {
			return false;
		}
		return userObj;
	},

	// called in Cart.js
	deleteProduct: function(id) {
		return axios.post('/delete/product', id, setOptions());
	},

	deleteCustomer: function(id) {
		return axios.post('/delete/customer', { id }, setOptions());
	},

	deleteAdmin: function(id) {
		return axios.post('/delete/admin', { id }, setOptions());
	},

	deleteUser: function(id, user) {
		if (user === 'customers') {
			return this.deleteCustomer(id);
		}
		return this.deleteAdmin(id);
	},

	// Called in the Login component
	login: function(data, pathname) {
		if (pathname === '/admin') {
			return axios.post('/auth/admin', data, timeout);
		}
		return axios.post('/auth/customer', data, timeout);
	},

	// called in InventoryCard.js
	saveProduct: function(data) {
		return axios.post('/save/product', data, setOptions());
	},

	// called in Cart.js to update the new quantity for a product
	updateQty: function(data) {
		return axios.post('/update/qty', data, setOptions());
	},

	updateCartName: function(id, name) {
		return axios.post('/update/cart', { id, name }, setOptions());
	},

	updateActiveCart: function(oldCartId, newCartId) {
		return axios.post(
			'/update/active-cart',
			{ oldCartId, newCartId },
			setOptions()
		);
	},

	// called in Dashboard/Profile.js
	updateAdmin: function(user) {
		return axios.post('/update/admin', user, setOptions());
	},

	updateCustomer: function(user) {
		return axios.post('/update/customer', user, setOptions());
	},

	updateUser: function(id, user) {
		if (user === 'customers') {
			return this.updateCustomer(id);
		}
		return this.updateAdmin(id);
	},

	createCart: function(id) {
		return axios.post('/create/cart', { id }, setOptions());
	},

	createAdmin: function(user) {
		return axios.post('/create/admin', user, setOptions());
	},

	// used in Dashboard/CreateCustomer
	createCustomer: function(customer) {
		return axios.post('/create/customer', customer, setOptions());
	},

	deleteCart: function(cartId) {
		return axios.post('/delete/cart', { cartId }, setOptions());
	},

	contactEmail: function(content) {
		return axios.post('/send/info', content, timeout);
	},

	sendResetEmail: function(email, route) {
		return axios.post('/send/reset', { email, route }, setOptions());
	},

	validateResetToken: function(token) {
		return axios.post('/auth/reset', { token }, timeout);
	},

	resetPassword: function(token, password) {
		return axios.post('/reset/password', { token, password }, timeout);
	},

	copyCart: function(cartId, activeCartId) {
		return axios.post('/copy/cart', { cartId, activeCartId });
	}
};
