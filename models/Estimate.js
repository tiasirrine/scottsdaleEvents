module.exports = function(sequelize, DataTypes) {
  const Estimate = sequelize.define(
    'Estimate',
    {
      _id: { type: DataTypes.INTEGER, allowNull: false }
    },
    { timestamps: false }
  );

  return Estimate;
};
