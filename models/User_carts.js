const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const User_carts = sequelize.define(
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

User_carts.sync();

module.exports = User_carts;
