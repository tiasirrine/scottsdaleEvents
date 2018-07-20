const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Carts = sequelize.define(
  'carts',
  {
    // customer_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    did_check_out: Sequelize.BOOLEAN,
    allowNull: false
  },
  {
    timestamps: true
  }
);

Carts.sync();

module.exports = Carts;
