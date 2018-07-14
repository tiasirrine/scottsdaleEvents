const Customer = require('../models/Customers');
const Admin = require('../models/Admins');
const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: function(unhashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        // sends an error if there is one
        if (err) reject(err);

        // creates the hash
        bcrypt.hash(unhashedPassword, salt, function(err, hash) {
          // sends an error if there is one
          if (err) reject(err);

          // saves the hashed password to the customer
          resolve(hash);
        });
      });
    });
  },

  checkPassword: function(potentialPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(potentialPassword, hashedPassword, function(err, res) {
        if (err) throw err;
        if (res === true) {
          resolve(res);
        } else {
          reject('Passwords do not match');
        }
      });
    });
  },

  // TODO: eventually there will need to be a check on the customer to see
  // if the account is locked or not
  getCustomer: function(username, password) {
    return new Promise((resolve, reject) => {
      Customer.findAll({ where: { username: username } })
        .then(returnedUser => {
          this.checkPassword(password, returnedUser[0].password)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch(() => reject('User not found'));
    });
  },

  // req.body is passed in here
  createCustomer: function(userObj) {
    const { password } = userObj;

    // hashes password
    return new Promise((resolve, reject) => {
      this.hashPassword(password)
        .then(hashedPassword => {
          userObj.password = hashedPassword;
          // creates a new customer with the hashed password
          Customer.create(userObj)
            // sends result back to client
            .then(result => resolve(result))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  },

  deleteCustomer: function(id) {
    return new Promise((resolve, reject) => {
      Customer.destroy({ where: { id: parseInt(id) } })
        .then(res => {
          // checks if 0 results were deleted
          if (!res) reject('Failed to remove customer');
          resolve('Customer removed');
        })
        .catch(() => reject('Failed to remove customer'));
    });
  },

  // values and where are objects
  updateFreeze: function(bool, id) {
    return new Promise((resolve, reject) => {
      Customer.update({ frozen: bool }, { where: { id: parseInt(id) } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

  //TODO: remove hash on results
  getAllCustomers: function() {
    return new Promise((resolve, reject) => {
      Customer.findAll({})
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

  getUserById: function(id) {
    return new Promise((resolve, reject) => {
      Customer.findAll({ where: { id: id } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
