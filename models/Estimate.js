module.exports = function(sequelize, DataTypes) {
  const Estimate = sequelize.define(
    'Estimate',
    {
      customerName: {
        type: DataTypes.STRING
      },
      groupName: {
        type: DataTypes.STRING
      },
      venue: {
        type: DataTypes.STRING
      },
      eventDate: {
        type: DataTypes.STRING
      },
      eventStartTime: {
        type: DataTypes.STRING
      },
      eventEndTime: {
        type: DataTypes.STRING
      },
      eventEndTime: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
      commentsOnEvent: {
        type: DataTypes.STRING
      },
      loadIn: {
        type: DataTypes.STRING
      },
      setByTime: {
        type: DataTypes.STRING
      },
      strikeTime: {
        type: DataTypes.STRING
      },
      commentsOnSetup: {
        type: DataTypes.STRING
      },
      willCallCustomerName: {
        type: DataTypes.STRING
      },
      willCallPickupDate: {
        type: DataTypes.STRING
      },
      willCallPickupTime: {
        type: DataTypes.STRING
      },
      willCallReturnDate: {
        type: DataTypes.STRING
      },
      willCallReturnTime: {
        type: DataTypes.STRING
      }
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
