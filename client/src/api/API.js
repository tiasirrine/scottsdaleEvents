import axios from 'axios';

export default {
  // called in App.js
  getProducts: function() {
    return axios.get('/get/products', { timeout: 15000 });
  },

  // called in the shopping cart
  getEstimate: function(values) {
    return axios.post('/get/estimate', values, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  loadCart: function() {
    return axios.get('/get/carts', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  getCustomers: function() {
    return axios.get('/get/customers', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  getAdmins: function() {
    return axios.get('/get/admins', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // used to display the add to cart button and to check if the admin, login and cart page can be displayed
  checkToken: function() {
    return axios.get('/auth/token', {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // used to get info about the user from the token
  decodeToken: function() {
    const token = sessionStorage.getItem('token');
    let userObj;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      userObj = JSON.parse(window.atob(base64));
    } catch (e) {
      return false;
    }
    return userObj;
  },

  // called in Cart.js
  deleteProduct: function(id) {
    return axios.post('/delete/product', id, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  deleteCustomer: function(id) {
    return axios.post(
      '/delete/customer',
      { id },
      {
        timeout: 15000,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }
    );
  },

  deleteAdmin: function(id) {
    return axios.post(
      '/delete/admin',
      { id },
      {
        timeout: 15000,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }
    );
  },

  deleteUser: function(id, user) {
    if (user === 'customers') {
      return this.deleteCustomer(id);
    }
    return this.deleteAdmin(id);
  },

  // Called in the Login component
  login: function(data, pathname) {
    if (pathname === '/admin') {
      return axios.post('/auth/admin', data, { timeout: 15000 });
    }
    return axios.post('/auth/customer', data, { timeout: 15000 });
  },

  // called in InventoryCard.js
  saveProduct: function(data) {
    return axios.post('/save/product', data, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // called in Cart.js to update the new quantity for a product
  updateQty: function(data) {
    return axios.post('/update/qty', data, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  updateAdmin: function(user) {
    return axios.post('/update/admin', user, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  updateCustomer: function(user) {
    return axios.post('/update/customer', user, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  updateUser: function(id, user) {
    if (user === 'customers') {
      return this.updateCustomer(id);
    }
    return this.updateAdmin(id);
  },

  createAdmin: function(user) {
    return axios.post('/create/admin', user, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  },

  // used in Dashboard/CreateCustomer
  createCustomer: function(customer) {
    return axios.post('/create/customer', customer, {
      timeout: 15000,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
};
