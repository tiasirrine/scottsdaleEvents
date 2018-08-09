import axios from 'axios';
import decode from 'jwt-decode';

export default {
  // called in App.js
  getProducts: function(category) {
    return axios.get('/get-products', { timeout: 15000 });
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get-estimate', values, { timeout: 15000 });
  },

  loadCart: function() {
    return axios.get('/load-carts', {
      timeout: 15000,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') }
    });
  },

  // used to display the add to cart button and to check if the admin, login and cart page can be displayed
  checkToken: function() {
    return axios.get('/check-token', {
      timeout: 15000,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('token') }
    });
  },

  deleteProduct: function(cartProductId) {
    return axios.post('/delete-product', cartProductId, { timeout: 15000 });
  },

  login: function(data, pathname) {
    if (pathname === '/admin') {
      return axios.get('/auth/admin', { params: data }, { timeout: 15000 });
    }
    return axios.get('/auth/customer', { params: data }, { timeout: 15000 });
  },

  saveProduct: function(data) {
    return axios.post('/save-product', data, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
};
