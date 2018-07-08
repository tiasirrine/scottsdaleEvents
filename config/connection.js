const mysql = require('mysql');
let connection;

// connects to heroku or to a local db
if (process.env.NODE_ENV === 'development') {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '343$&bxxYM^9m',
    database: 'scottsdaleEvents'
  });
} else {
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
