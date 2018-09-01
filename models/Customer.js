module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define(
    'Customer',
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'This email is already in use' },
        validate: { isEmail: { args: true, msg: 'Please enter a valid email address' } },
        set(val) {
          this.setDataValue('email', val.toLowerCase());
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: { args: [3], msg: 'Password must be at least 3 characters' } }
      },
      company: { type: DataTypes.STRING, allowNull: false },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          val.trim();
          this.setDataValue('firstName', val.charAt(0).toUpperCase() + val.slice(1));
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          val.trim();
          this.setDataValue('lastName', val.charAt(0).toUpperCase() + val.slice(1));
        }
      },
      suspend: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    { timestamps: false }
  );

  Customer.associate = function(models) {
    Customer.hasMany(models.Cart, { onDelete: 'cascade' });
  };

  return Customer;
};
