module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define(
    'Product',
    {
      category: { type: DataTypes.STRING },
      subcategory: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.DECIMAL },
      quantity: { type: DataTypes.INTEGER },
      url: { type: DataTypes.STRING }
    },
    { timestamps: false }
  );

  // Product.associate = function(models) {
  //   Product.hasMany(models.CartProduct, { onDelete: 'cascade' });
  // };

  return Product;
};
