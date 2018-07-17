const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Customers = sequelize.define(
  'customer',
  {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: 'Password must be at least 3 characters'
        }
      }
    },
    frozen: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);

Customers.sync();

module.exports = Customers;
