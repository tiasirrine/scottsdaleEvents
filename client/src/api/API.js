import axios from 'axios';

export default {
  // called in App.js
  getProducts: function(category) {
    return axios.get('/get-products', { timeout: 15000 });
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get-estimate', values);
  },

  //TODO: pass in customer id
  loadCart: function() {
    return axios.get('/load-cart', { params: { id: 1 }, timeout: 15000 });
  },

  login: function(data) {
    return axios.post('/login', data);
  }
};
