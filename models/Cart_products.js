const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Cart_products = sequelize.define(
  'cart_product',
  {
    customer_cart_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Cart_products.sync();

module.exports = Cart_products;
