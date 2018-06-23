const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // create new user
  create: function(req, res) {
    // before attempting to create the user, call hashPassword to hash the password.
    // if the password hashed was a success,
    // then attempt to create the user
    // if hashed pass failed, throw err
    // mongoose requires each username to be unique
    // if the username is not unique, the user will not create, and throw err
    // if password hashed successfully,
    // then create a new user
    this.hashPassword(req.body)
      .then(newUser => {
        User.create(newUser)
          .then(result => console.log(result))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

  // find user at login
  findOne: function(req, res) {
    // req.body holds the username and password from attempted sign in
    // find potential user by search for the provided name off of req.body.name
    User.findOne({ username: req.body.name })
      .then(returnedUser => {
        // if a user is found,
        // then call this.checkPassword to check the provided password
        // pass in the potential password from the user, and the hashedPassword from the returnedUser
      })
      .catch(err => console.log(err));
  },

  // delete user
  delete: function(req, res) {
    User.deleteOne({ username: req.body.username })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // hashes a user password after successful creation
  hashPassword: function(potentialUser) {
    // Store hash as the password, as opposed to the plain text password.
    // if password hash was a success,
    // then return user with updated encrypted password
    // else, return err
  },

  checkPassword: function(potentialPassword, hashedPassword) {
    // if the passwords match,
    // then authenticate the user
    // else, return login failed message to the user
  }
};
