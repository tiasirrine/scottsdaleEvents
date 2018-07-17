const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

const Admins = sequelize.define(
  'admin',
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
      allowNull: false
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
