const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Customer_carts = sequelize.define(
  'user_cart',
  {
    user_id: {
      type: Sequelize.INTEGER
    },
    did_check_out: Sequelize.BOOLEAN
  },
  {
    timestamps: true
  }
);

Customer_carts.sync();

module.exports = Customer_carts;
