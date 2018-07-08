import axios from 'axios';

export default {
  checkUser: function(userInfo) {
    return axios.post('/login', userInfo);
  }
};
