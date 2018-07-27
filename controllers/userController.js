const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  // loads all products for a user, for their active cart
  getCart: function(id) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({
        where: {
          id: id
        },
        include: [
          {
            model: db.Cart,
            where: {
              isActive: false
            },
            // order: [['updatedAt', 'DESC']],
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
  getCustomer: function(email, password) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({
        where: { email: email },
        include: [
          {
            model: db.Cart,
            where: {
              isActive: false
            }
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
              resolve(obj);
            })
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
                  isActive: false,
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
  },

  getUserById: function(id) {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({ where: { id: id } })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
