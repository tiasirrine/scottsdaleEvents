module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define(
    'Admin',
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'This email is already in use' },
        validate: { isEmail: { args: true, msg: 'Please enter a valid email address' } },
        set(val) {
          val.trim();
          this.setDataValue('email', val.toLowerCase());
        }
      },
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: { args: [3], msg: 'Password must be at least 3 characters' } }
      },
      suspend: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      superAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
    { timestamps: false }
  );

  return Admin;
};
