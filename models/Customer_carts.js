const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Customer_carts = sequelize.define(
  'user_cart',
  {
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    did_check_out: Sequelize.BOOLEAN,
    allowNull: false
  },
  {
    timestamps: true
  }
);

Customer_carts.sync();

module.exports = Customer_carts;
