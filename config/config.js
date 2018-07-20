module.exports = {
  production: {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    operatorsAliases: false,
    dialect: 'mysql'
  }
};
