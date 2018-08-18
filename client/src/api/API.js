import axios from 'axios';

const authConfig = {
  timeout: 15000,
  headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') }
};

const timeout = { timeout: 15000 };

export default {
  // called in App.js
  getProducts: function(category) {
    return axios.get('/get-products', timeout);
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get-estimate', values, timeout);
  },

  loadCart: function() {
    return axios.get('/load-carts', authConfig);
  },

  // used to display the add to cart button and to check if the admin, login and cart page can be displayed
  checkToken: function() {
    return axios.get('/check-token', authConfig);
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
  deleteProduct: function(cartProductId) {
    return axios.post('/delete-product', cartProductId, timeout);
  },

  // Called in the Login component
  login: function(data, pathname) {
    if (pathname === '/admin') {
      return axios.get('/auth/admin', { params: data }, timeout);
    }
    return axios.get('/auth/customer', { params: data }, timeout);
  },

  // called in InventoryCard.js
  saveProduct: function(data) {
    return axios.post('/save-product', data, authConfig);
  },

  // called in Cart.js to update the new quantity for a product
  updateQty: function(data) {
    return axios.post('/update/qty', data, authConfig);
  },

  updateAdmin: function(user) {
    return axios.post('/update/admin', user, authConfig);
  },

  // used in Dashboard/CreateCustomer
  createCustomer: function(customer) {
    return axios.post('/create/customer', customer, authConfig);
  }
};
