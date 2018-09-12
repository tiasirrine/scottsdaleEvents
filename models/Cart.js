const date = require('../util/getDate');
module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define(
    'Cart',
    {
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      cartName: {
        type: DataTypes.STRING,
        defaultValue: 'Unnamed Cart',
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        defaultValue: date(),
        allowNull: false
      },
      didCheckOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    { timestamps: false }
  );

  Cart.associate = function(models) {
    Cart.hasMany(models.CartProduct, { onDelete: 'cascade' });
    Cart.hasMany(models.Estimate, { onDelete: 'cascade' });
  };

  return Cart;
};
