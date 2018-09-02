module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define(
    'Cart',
    {
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      cartName: {
        type: DataTypes.STRING,
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
