import axios from 'axios';

export default {
  // called in CategoryProduct
  getCategoryProducts: function(category) {
    return axios.get('/get-category-products', {
      params: { category },
      timeout: 15000
    });
  },
  getEstimate: function(values) {
    return axios.post('/get-estimate', values);
  }
};
