const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Admins = sequelize.define(
  'admin',
  {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    superAdmin: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);

Admins.sync();

module.exports = Admins;
