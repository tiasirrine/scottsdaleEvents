module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define(
    'Admin',
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'This email is already in use' },
        validate: {
          isEmail: { args: true, msg: 'Please enter a valid email address' }
        }
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
  );

  return Admin;
};
