import axios from 'axios';

export default {
  // called in App.js
  getDistinctCategories: function() {
    return axios.get('/get-distinct-category');
  },

  // called in CategoryProduct
  getCategoryProducts: function(category) {
    return axios.get('/get-category-products', { params: { category } });
  }

  // checkUser: function(userInfo) {
  //   return axios.post('/login', userInfo);
  // }
};
