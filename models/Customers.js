const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Customers = sequelize.define(
  'customer',
  {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
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
