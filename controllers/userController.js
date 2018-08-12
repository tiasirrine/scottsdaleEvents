const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  // loads all products for a user, for their active cart
  loadCarts: function(id) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({
        where: { id: id },
        include: [
          {
            model: db.Cart,
            include: [
              {
                model: db.CartProduct,
                include: [{ model: db.Product }]
              }
            ]
          }
        ]
      })
        .then(result => {
          if (result.length) resolve(result[0].Carts);
          else reject('No carts found for this user');
        })
        .catch(err => {
          console.log('err:', err);
          reject(err);
        });
    });
  },

  createCart: function(id) {
    db.Cart.create({
      isActive: false,
      CustomerId: id
    })
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => reject(err));
  },

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

  getUserById: function(id) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({
        where: { id: id },
        include: [
          {
            model: db.Cart,
            where: { isActive: true }
          }
        ]
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          console.log('err', err);
          reject(err);
        });
    });
  },

  getAdminById: function(id) {
    return new Promise((resolve, reject) => {
      db.Admin.findAll({ where: { id: id } })
        .then(result => resolve(result))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },

  // TODO: eventually there will need to be a check on the customer to see
  // if the account is locked or not
  getCustomer: function(email, password) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({
        where: { email: email },
        include: [
          {
            model: db.Cart,
            where: { isActive: true }
          }
        ]
      })
        .then(returnedUser => {
          this.checkPassword(password, returnedUser[0].password)
            .then(() => {
              const obj = {};
              obj.id = returnedUser[0].dataValues.id;
              obj.email = returnedUser[0].dataValues.email;
              obj.carts = returnedUser[0].dataValues.Carts;
              obj.firstName = returnedUser[0].dataValues.firstName;
              obj.lastName = returnedUser[0].dataValues.lastName;
              obj.company = returnedUser[0].dataValues.company;
              obj.isAdmin = false;
              resolve(obj);
            })
            .catch(err => reject(err));
        })
        .catch(() => reject('User not found'));
    });
  },

  // logs in an admin
  getAdmin: function(email, password) {
    return new Promise((resolve, reject) => {
      db.Admin.findAll({ where: { email: email } })
        .then(returnedUser => {
          if (!returnedUser.length) {
            return reject('User not found');
          }
          this.checkPassword(password, returnedUser[0].password)
            .then(() => {
              const obj = {};
              obj.id = returnedUser[0].dataValues.id;
              obj.email = returnedUser[0].dataValues.email;
              obj.firstName = returnedUser[0].dataValues.firstName;
              obj.lastName = returnedUser[0].dataValues.lastName;
              obj.isAdmin = true;
              resolve(obj);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        })
        .catch(err => {
          console.log('asdfa', err);
          reject('User not found');
        });
    });
  },

  // req.body is passed in here
  // creates an admin
  createAdmin: function(userObj) {
    const { password } = userObj;
    // hashes password
    return new Promise((resolve, reject) => {
      if (password.length < 3) {
        reject('Password must be at least 3 characters');
      } else {
        this.hashPassword(password)
          .then(hashedPassword => {
            userObj.password = hashedPassword;
            // creates a new customer with the hashed password
            db.Admin.create(userObj)
              // sends result back to client
              .then(newCustomer => resolve(newCustomer))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }
    });
  },

  // req.body is passed in here
  createCustomer: function(userObj) {
    const { password } = userObj;

    // hashes password
    return new Promise((resolve, reject) => {
      if (password.length < 3) {
        reject('Password must be at least 3 characters');
      } else {
        this.hashPassword(password)
          .then(hashedPassword => {
            userObj.password = hashedPassword;
            // creates a new customer with the hashed password
            db.Customer.create(userObj)
              // sends result back to client
              .then(newCustomer => {
                // creates a cart for the customer
                db.Cart.create({
                  isActive: true,
                  CustomerId: newCustomer.id
                })
                  .then(() => resolve(newCustomer))
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }
    });
  },

  deleteCustomer: function(id) {
    return new Promise((resolve, reject) => {
      db.Customer.destroy({ where: { id: parseInt(id) } })
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
      db.Customer.update({ frozen: bool }, { where: { id: parseInt(id) } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },

  //TODO: remove hash on results
  getAllCustomers: function() {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({})
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
