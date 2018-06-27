import axios from 'axios';

export default {
  // google api function
  // create user
  // authenticate user
  // delete user
  // get all products
  // get one product
  // delete one product
  // create new event
  // stripe payment api function

  getMoney: function(contactInfo) {
    return axios.post('/charge', contactInfo);
  }
};
