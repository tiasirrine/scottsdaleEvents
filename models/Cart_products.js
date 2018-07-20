module.exports = function(sequelize, DataTypes) {
  const Cart_product = sequelize.define('Cart_product', {
    customer_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Cart_product;
};
