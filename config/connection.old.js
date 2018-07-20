const Sequelize = require('sequelize');

let sequelize;

if (process.env.RDS_HOSTNAME) {
  sequelize = new Sequelize(
    process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
      host: process.env.RDS_HOSTNAME,
      port: process.env.RDS_PORT,
      dialect: 'mysql',
      dialectOptions: {
        ssl: 'Amazon RDS'
      },
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
