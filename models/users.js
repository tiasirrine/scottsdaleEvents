const orm = require('../config/orm');
const bcrypt = require('bcryptjs');

module.exports = {
  createAdmin: function(table, column, value, callback) {},
  deleteAdmin: function(table, column, value, callback) {},
  selectAdminByUsername: function(table, column, value, callback) {},

  // creates a new customer
  createCustomer: function(values, callback) {
    // grabs the password from the new customer
    const { password } = values;

    // creates the salt
    bcrypt.genSalt(10, function(err, salt) {
      // sends an error if there is one
      if (err) callback(err);

      // creates the hash
      bcrypt.hash(password, salt, function(err, hash) {
        // sends an error if there is one
        if (err) callback(err);

        // saves the hashed password to the customer
        values.password = hash;

        // saves the user
        orm.createOneRow('customers', values, (err, result) => {
          // will either send an error, or send a success status
          callback(err, result);
        });
      });
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

  // gets a user at login
  selectOneCustomer: function(value, callback) {
    // grabs the user and password
    const { username, password } = value;

    // searches for the user
    orm.selectAllByColumn('customers', 'username', username, (err, result) => {
      // sends an error if there is one
      if (err) callback(err);

      // gets the hashed password on a result
      const hash = result[0].password;

      // compares the 2 passwords
      bcrypt.compare(password, hash, function(err, res) {
        // if res is false, then send an error
        if (!res) {
          callback('Passwords do not match');
        } else {
          // removes the hashed password before sending to the client
          delete result[0].password;

          // else send the result
          callback(err, result);
        }
      });
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
