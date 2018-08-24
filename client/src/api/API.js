import axios from 'axios';

export default {
  // called in App.js
  getProducts: function() {
    return axios.get('/get/products', { timeout: 15000 });
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get/estimate', values, { timeout: 15000 });
  },

  loadCart: function() {
    return axios.get('/get/carts', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // used to display the add to cart button and to check if the admin, login and cart page can be displayed
  checkToken: function() {
    return axios.get('/auth/token', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
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
    return axios.post('/delete/product', cartProductId, { timeout: 15000 });
  },

  // Called in the Login component
  login: function(data, pathname) {
    if (pathname === '/admin') {
      return axios.get('/auth/admin', { params: data }, { timeout: 15000 });
    }
    return axios.get('/auth/customer', { params: data }, { timeout: 15000 });
  },

  // called in InventoryCard.js
  saveProduct: function(data) {
    return axios.post('/save/product', data, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // called in Cart.js to update the new quantity for a product
  updateQty: function(data) {
    return axios.post('/update/qty', data, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  updateAdmin: function(user) {
    return axios.post('/update/admin', user, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  createAdmin: function(user) {
    return axios.post('/create/admin', user, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // used in Dashboard/CreateCustomer
  createCustomer: function(customer) {
    return axios.post('/create/customer', customer, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
};
