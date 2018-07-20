module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define(
    'Product',
    {
      category: { type: DataTypes.STRING },
      subcategory: { type: DataTypes.STRING },
      key: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.DECIMAL }
    },
    { timestamps: false }
  );

  // Product.associate = function(models) {
  //   Product.hasMany(models.CartProduct, { onDelete: 'cascade' });
  // };

  return Product;
};
