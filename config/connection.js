const mysql = require('mysql');
let connection;

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '343$&bxxYM^9m',
  database: 'scottsdaleEvents'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL, ID: ' + connection.threadId);
});

module.exports = connection;
