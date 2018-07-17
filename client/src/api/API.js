import axios from 'axios';

export default {
  // called in App.js
  getDistinctCategories: function() {
    return axios.get('/get-distinct-category', { timeout: 15000 });
  },

  // called in CategoryProduct
  getCategoryProducts: function(category) {
    return axios.get('/get-category-products', {
      params: { category },
      timeout: 15000
    });
  }
};
