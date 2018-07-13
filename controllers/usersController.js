const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // create new user
  // password will be hashed by the time this runs
  save: function(newUser) {
    return User.create(newUser)
      .then(() => 'User created')
      .catch(err => {
        // console.log('CREATE-USER-FAIL:', err.message);
        throw new Error(err.message);
      });
  },

  // find user at login
  findOne: function(user) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: user.username })
        .then(returnedUser => {
          if (!returnedUser) reject('No user found');
          this.checkPassword(user.password, returnedUser.password)
            .then(res => {
              resolve(returnedUser);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  },

  // delete user
  delete: function(username) {
    User.deleteOne({ username })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // generate hash based on salt
  genHash: function(salt, password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) reject(err);
        else resolve({ salt, password, hash });
      });
    });
  },

  // generate salt for hashing password
  genSalt: function(password) {
    return new Promise((resolve, reject) => {
      if (!password) reject('Password is required');
      if (password.length < 4)
        reject('Password must be longer than 4 characters');
      bcrypt.genSalt(10, function(err, salt) {
        if (err) reject(err);
        else resolve({ salt, password });
      });
    });
  },

  createNewUser: function(user) {
    return new Promise((resolve, reject) => {
      this.genSalt(user.password)
        .then(result => {
          this.genHash(result.salt, result.password).then(hashRes => {
            user.password = hashRes.hash;
            this.save(user)
              .then(res => resolve(res))
              .catch(err => reject(err));
          });
        })
        .catch(error => reject(error));
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

  getUserById: function(id, callback) {
    User.findById(id, callback);
  }
};
