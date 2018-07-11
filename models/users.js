const orm = require('../config/orm');
const bcrypt = require('bcryptjs');

module.exports = {
  createAdmin: function(table, column, value, callback) {},
  deleteAdmin: function(table, column, value, callback) {},
  selectAdminByUsername: function(table, column, value, callback) {},

  createCustomer: function(values, callback) {
    orm.createOneRow('customers', values, (err, result) => {
      callback(err, result);
    });
  },

  deleteCustomer: function(value, callback) {
    orm.deleteOneRow('customers', value, (err, result) => {
      callback(err, result);
    });
  },

  updateFreeze: function(setValue, whereValue, callback) {
    orm.updateOneRow('customers', setValue, whereValue, (err, result) => {
      callback(err, result);
    });
  },

  selectCustomerByUsername: function(column, value, callback) {
    orm.selectAllByColumn('customers', column, value, (err, result) => {
      callback(err, result);
    });
  },

  selectAllCustomers: function(callback) {
    orm.select(
      'customers',
      ['id', 'username', 'email', 'frozen'],
      (err, result) => {
        callback(err, result);
      }
    );
  }
};
