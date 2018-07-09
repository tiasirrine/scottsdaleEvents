import axios from 'axios';

export default {
  getInventoryCategories: function() {
    return axios.get('/get-inventory-category');
  }

  // checkUser: function(userInfo) {
  //   return axios.post('/login', userInfo);
  // }
};
