const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  // create new user
  // password will be hashed by the time this runs
  save: function(newUser) {
    return User.create(newUser)
      .then(() => 'User created')
      .catch(() => {
        throw 'User failed to create';
      });
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
  hashPassword: function(newUser) {
    const that = this;

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
      bcrypt.genSalt(10, function(err, salt) {
        if (err) reject(err);
        else resolve({ salt, password });
      });
    });
  },

  createNewUser: function(user) {
    return new Promise((resolve, reject) => {
      this.genSalt(user.password).then(result =>
        this.genHash(result.salt, result.password).then(hashRes => {
          user.password = hashRes.hash;
          this.save(user)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
      );
    });
  },

  checkPassword: function(potentialPassword, hashedPassword) {
    // if the passwords match,
    // then authenticate the user
    // else, return login failed message to the user
  }
};
