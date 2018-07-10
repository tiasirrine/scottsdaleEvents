import axios from 'axios';

export default {
  getInventoryCategories: function() {
    return axios.get('/get-inventory-category');
  },

  getCategoryProducts: function(category) {
    return axios.get('/get-category-products', { params: { category } });
  },

  getInventoryItems: function() {
    return axios.get('/get-inventory-items');
  }

  // checkUser: function(userInfo) {
  //   return axios.post('/login', userInfo);
  // }
};
