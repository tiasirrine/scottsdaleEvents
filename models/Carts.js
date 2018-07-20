module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define('Cart', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    did_check_out: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return Cart;
};
