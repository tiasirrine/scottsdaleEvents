module.exports = function(sequelize, DataTypes) {
  const CartProduct = sequelize.define(
    'CartProduct',
    {
      qty: { type: DataTypes.INTEGER, allowNull: false }
    },
    { timestamps: false }
  );

  CartProduct.associate = function(models) {
    CartProduct.belongsTo(models.Product, {
      foreignKey: { allowNull: false, unique: true }
    });
  };

  return CartProduct;
};
