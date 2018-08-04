import axios from 'axios';

export default {
  // called in App.js
  getProducts: function(category) {
    return axios.get('/get-products', { timeout: 15000 });
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get-estimate', values, { timeout: 15000 });
  },

  //TODO: pass in customer id
  loadCart: function(id) {
    return axios.get('/load-cart', { params: { id }, timeout: 15000 });
  },

  deleteProduct: function(cartProductId) {
    return axios.post('/delete-product', cartProductId, { timeout: 15000 });
  },

  login: function(data) {
    return axios.get('/login', { params: data }, { timeout: 15000 });
  },

  saveProduct: function(data) {
    return axios.post('/save-product', data, { timeout: 15000 });
  }
};
