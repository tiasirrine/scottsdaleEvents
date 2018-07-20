module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define(
    'Customer',
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'This email is already in use' },
        validate: {
          isEmail: { args: true, msg: 'Please enter a valid email address' }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [3], msg: 'Password must be at least 3 characters' }
        }
      },
      frozen: { type: DataTypes.BOOLEAN }
    },
    { timestamps: false }
  );

  Customer.associate = function(models) {
    Customer.hasMany(models.Cart, { onDelete: 'cascade' });
  };

  return Customer;
};
