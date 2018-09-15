module.exports = function(sequelize, DataTypes) {
  const Temp = sequelize.define(
    'Temp',
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      category: { type: DataTypes.STRING },
      subcategory: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price: { type: DataTypes.INTEGER },
      quantity: { type: DataTypes.INTEGER },
      url: { type: DataTypes.TEXT },
      extraurl: { type: DataTypes.TEXT }
    },
    { timestamps: false }
  );

  return Temp;
};
