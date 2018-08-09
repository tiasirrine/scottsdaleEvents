module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define(
    'Cart',
    {
      isActive: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    { createdAt: false }
  );

  Cart.associate = function(models) {
    Cart.hasMany(models.CartProduct, { onDelete: 'cascade' });
  };

  return Cart;
};
