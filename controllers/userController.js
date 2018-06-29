const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // create new user
  // password will be hashed by the time this runs
  save: function(newUser) {
    return User.create(newUser)
      .then(() => 'User created')
      .catch(err => {
        // console.log('ERROR', err);
        throw err.errors;
      });
  },

  // find user at login
  findOne: function(user, password) {
    User.findOne({ username: user })
      .then(returnedUser => {
        console.log(returnedUser);
        this.checkPassword('Hinton', returnedUser.password)
          .then(res => console.log('RESULT:', res))
          .catch(err => console.log('ERROR:', err));
      })
      .catch(err => console.log(err));
  },

  // delete user
  delete: function(username) {
    User.deleteOne({ username })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // hashes a user password after successful creation
  hashPassword: function(newUser) {
    // const that = this;
    // bcrypt.genSalt(10, function(err, salt) {
    //   if (err) throw err;
    //   bcrypt.hash(newUser.password, salt, function(err, hash) {
    //     if (err) throw err;
    //     newUser.password = hash;
    //     that.create(newUser);
    //   });
    // });
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
        .then(result =>
          this.genHash(result.salt, result.password).then(hashRes => {
            user.password = hashRes.hash;
            this.save(user)
              .then(res => resolve(res))
              .catch(err => reject(err));
          })
        )
        .catch(error => reject(error));
    });
  },

  checkPassword: function(potentialPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(potentialPassword, hashedPassword, function(err, res) {
        if (err) throw err;
        console.log(res);
        if (res === true) {
          resolve(res);
        } else {
          reject('passwords do not match');
        }
      });
    });
  }
};
