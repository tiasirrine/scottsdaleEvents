const orm = require('../config/orm');
const bcrypt = require('bcryptjs');

module.exports = {
  createAdmin: function(table, column, value, callback) {},
  deleteAdmin: function(table, column, value, callback) {},
  selectAdminByUsername: function(table, column, value, callback) {},
  createCustomer: function(value, columns, callback) {
    orm.createOneRow('customers', columns, value, (err, result) => {
      callback(err, result);
    });
  },
  deleteCustomer: function(value, columns, callback) {
    orm.deleteOneRow('customers', columns, value, (err, result) => {
      callback(err, result);
    });
  },
  freezeCustomer: function(value, callback) {
    orm.updateOneRow('customers', value, (err, result) => {
      callback(err, result);
    });
  },
  selectCustomerByUsername: function(value, callback) {
    orm.selectAll('customers', value, (err, result) => {
      callback(err, result);
    });
  }
};
