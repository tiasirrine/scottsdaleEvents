module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define(
    'Product',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      category: { type: DataTypes.STRING },
      subcategory: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.INTEGER },
      quantity: { type: DataTypes.INTEGER },
      url: { type: DataTypes.TEXT }
    },
    { timestamps: false }
  );

  return Product;
};
