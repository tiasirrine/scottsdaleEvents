import axios from 'axios';

export default {
  getInventoryCategories: function() {
    return axios.get('/get-inventory-category');
  },

  getCategoryProducts: function(category) {
    return axios.get('/get-category-products', { params: { category } });
  }

  // checkUser: function(userInfo) {
  //   return axios.post('/login', userInfo);
  // }
};
