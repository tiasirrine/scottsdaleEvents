module.exports = function(sequelize, DataTypes) {
  const Estimate = sequelize.define(
    'Estimate',
    {
      _id: { type: DataTypes.INTEGER, allowNull: false }
    },
    { timestamps: false }
  );

  Estimate.associate = function(models) {
    Estimate.belongsTo(models.Cart, {
      foreignKey: { allowNull: false }
    });
  };

  return Estimate;
};
