module.exports = {
  production: {
    username: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASS,
    database: process.env.JAWSDB_DB,
    host: process.env.JAWSDB_HOST,
    operatorsAliases: false,
    logging: false,
    dialect: 'mysql'
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    operatorsAliases: false,
    logging: false,
    dialect: 'mysql'
  }
};
