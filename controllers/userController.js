const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  // loads all products for a user, for their active cart
  getCarts: function(id) {
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
          else reject({ message: 'No carts found for this user' });
        })
        .catch(err => {
          console.log('err:', err);
          reject(err);
        });
    });
  },

  createCart: function(id) {
    return new Promise((resolve, reject) => {
      db.Cart.findOne({
        where: { CustomerId: id, isActive: true }
      })
        .then(result => {
          const updated = { ...result };
          updated.isActive = false;
          result
            .update(updated)
            .then(res => {
              if (res) {
                db.Cart.create({
                  isActive: true,
                  CustomerId: id,
                  cartName: 'Unnamed Cart'
                })
                  .then(res => {
                    resolve(res);
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  hashPassword: function(unhashedPassword) {
    unhashedPassword = unhashedPassword.trim();
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
          reject({ message: 'Passwords do not match', status: 401 });
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
          if (!returnedUser.length) {
            reject({ message: 'User not found', status: 401 });
          }
          this.checkPassword(password, returnedUser[0].password)
            .then(() => {
              if (returnedUser[0].dataValues.suspend) {
                reject({ message: 'User is suspended', status: 401 });
                return;
              }
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
        .catch(err => reject(err));
    });
  },

  // logs in an admin
  getAdmin: function(email, password) {
    return new Promise((resolve, reject) => {
      db.Admin.findAll({ where: { email: email } })
        .then(returnedUser => {
          if (!returnedUser.length) {
            return reject({ message: 'User not found', status: 401 });
          }
          this.checkPassword(password, returnedUser[0].password)
            .then(() => {
              if (returnedUser[0].dataValues.suspend) {
                reject({ message: 'User is suspended', status: 401 });
                return;
              }
              const obj = {};
              obj.id = returnedUser[0].dataValues.id;
              obj.email = returnedUser[0].dataValues.email;
              obj.firstName = returnedUser[0].dataValues.firstName;
              obj.lastName = returnedUser[0].dataValues.lastName;
              obj.suspend = returnedUser[0].dataValues.suspend;
              obj.superAdmin = returnedUser[0].dataValues.superAdmin;
              obj.isAdmin = true;
              resolve(obj);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        })
        .catch(err => {
          console.log(err);
          reject(err);
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
        reject({ message: 'Password must be at least 3 characters' });
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

  // updates any admin values
  updateAdmin: function(userObj) {
    return new Promise((resolve, reject) => {
      // first find the admin to update based on id
      db.Admin.findOne({ where: { id: userObj.id } })
        .then(result => {
          if (result) {
            // since the user may update their password here, the password needs to be hashed
            if (userObj.password) {
              this.hashPassword(userObj.password)
                .then(hashedPassword => {
                  userObj.password = hashedPassword;
                  // if the admin is found, update the found value with the new value
                  resolve(result.update(userObj));
                })
                .catch(err => {
                  console.log(err);
                  reject(err);
                });
            } else {
              resolve(result.update(userObj));
            }
          } else {
            reject({ message: 'An error occured during the update' });
          }
        })
        .catch(err => {
          console.log('err:', err);
          reject(err);
        });
    });
  },

  // req.body is passed in here
  createCustomer: function(userObj) {
    const { password } = userObj;

    // hashes password
    return new Promise((resolve, reject) => {
      if (password.length < 3) {
        reject({ message: 'Password must be at least 3 characters' });
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
                  cartName: 'Unnamed Cart',
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
          if (!res) {
            console.log('ERROR: ', res);
            reject({ message: 'Failed to remove customer' });
          }
          resolve('Customer removed');
        })
        .catch(err => reject(err));
    });
  },

  deleteAdmin: function(id) {
    return new Promise((resolve, reject) => {
      db.Admin.destroy({ where: { id: parseInt(id) } })
        .then(res => {
          // checks if 0 results were deleted
          if (!res) {
            console.log('ERROR: ', res);
            reject({ message: 'Failed to remove customer' });
          }
          resolve('Customer removed');
        })
        .catch(err => reject(err));
    });
  },

  // values and where are objects
  updateCustomer: function(user) {
    return new Promise((resolve, reject) => {
      db.Customer.find({
        where: {
          id: user.id
        }
      })
        .then(result => {
          if (result) {
            result
              .update(user)
              .then(() => resolve('Success'))
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  },

  getAllCustomers: function() {
    return new Promise((resolve, reject) => {
      db.Customer.findAll({})
        .then(result => {
          result.forEach(a => {
            delete a.dataValues.password;
          });
          resolve(result);
        })
        .catch(err => reject(err));
    });
  },

  getAllAdmins: function() {
    return new Promise((resolve, reject) => {
      db.Admin.findAll({})
        .then(result => {
          result.forEach(a => {
            delete a.dataValues.password;
          });
          resolve(result);
        })
        .catch(err => reject(err));
    });
  }
};
