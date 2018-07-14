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

  // save: function(newUser) {
  //   return User.create(newUser)
  //     .then(() => 'User created')
  //     .catch(err => {
  //       // console.log('CREATE-USER-FAIL:', err.message);
  //       throw new Error(err.message);
  //     });
  // },

  // // find user at login
  // findOne: function(user) {
  //   return new Promise((resolve, reject) => {
  //     User.findOne({ username: user.username })
  //       .then(returnedUser => {
  //         if (!returnedUser) reject('No user found');
  //         this.checkPassword(user.password, returnedUser.password)
  //           .then(res => {
  //             resolve(returnedUser);
  //           })
  //           .catch(err => reject(err));
  //       })
  //       .catch(err => reject(err));
  //   });
  // },

  // // delete user
  // delete: function(username) {
  //   User.deleteOne({ username })
  //     .then(result => console.log(result))
  //     .catch(err => console.log(err));
  // },

  // // generate hash based on salt
  // genHash: function(salt, password) {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.hash(password, salt, function(err, hash) {
  //       if (err) reject(err);
  //       else resolve({ salt, password, hash });
  //     });
  //   });
  // },

  // // generate salt for hashing password
  // genSalt: function(password) {
  //   return new Promise((resolve, reject) => {
  //     if (!password) reject('Password is required');
  //     if (password.length < 4)
  //       reject('Password must be longer than 4 characters');
  //     bcrypt.genSalt(10, function(err, salt) {
  //       if (err) reject(err);
  //       else resolve({ salt, password });
  //     });
  //   });
  // },

  // createNewUser: function(user) {
  //   return new Promise((resolve, reject) => {
  //     this.genSalt(user.password)
  //       .then(result => {
  //         this.genHash(result.salt, result.password).then(hashRes => {
  //           user.password = hashRes.hash;
  //           this.save(user)
  //             .then(res => resolve(res))
  //             .catch(err => reject(err));
  //         });
  //       })
  //       .catch(error => reject(error));
  //   });
  // },

  // checkPassword: function(potentialPassword, hashedPassword) {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.compare(potentialPassword, hashedPassword, function(err, res) {
  //       if (err) throw err;
  //       if (res === true) {
  //         resolve(res);
  //       } else {
  //         reject('Passwords do not match');
  //       }
  //     });
  //   });
  // },

  // getUserById: function(id, callback) {
  //   User.findById(id, callback);
  // }
};
