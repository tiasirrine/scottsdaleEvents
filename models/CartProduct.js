module.exports = function(sequelize, DataTypes) {
  const CartProduct = sequelize.define(
    'CartProduct',
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          maxQuantity(value) {
            if (value > this.maxQty) {
              throw new Error(`Max quantity exceeded`);
            }
          }
        },
        set(val) {
          this.setDataValue('qty', Number(val));
        }
      },
      maxQty: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { timestamps: false }
  );

  CartProduct.associate = function(models) {
    CartProduct.belongsTo(models.Product, { onDelete: 'cascade' });
  };

  return CartProduct;
};
