module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define(
    'Admin',
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          isEmail: { args: true, msg: 'Please enter a valid email address' }
        }
      },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
  );

  return Admin;
};
