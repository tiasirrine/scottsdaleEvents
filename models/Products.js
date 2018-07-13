const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Products = sequelize.define(
  'product',
  {
    category: {
      type: Sequelize.STRING
    },
    subcategory: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL
    }
  },
  {
    timestamps: false
  }
);

Products.sync();

module.exports = Products;
