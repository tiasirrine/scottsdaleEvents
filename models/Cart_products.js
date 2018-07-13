const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Cart_products = sequelize.define(
  'cart_product',
  {
    user_cart_id: {
      type: Sequelize.INTEGER
    },
    inventory_id: {
      type: Sequelize.INTEGER
    },
    qty: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

Cart_products.sync();

module.exports = Cart_products;
