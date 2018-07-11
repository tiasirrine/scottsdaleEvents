const connection = require('./connection');

module.exports = {
  selectDistinct: function(table, callback) {
    const query = 'SELECT DISTINCT CATEGORY FROM ??;';
    connection.query(query, [table], (err, result) => {
      callback(err, result);
    });
  },

  select: function(table, columns, callback) {
    let query = 'SELECT ?? FROM ??;';
    // SELECT id, username, email FROM customers;
    connection.query(query, [columns, [table]], (err, result) => {
      callback(err, result);
    });
  },

  selectAllByColumn: function(table, column, value, callback) {
    let query = 'SELECT * FROM ?? WHERE ??=?;';
    connection.query(query, [[table], [column], [value]], (err, result) => {
      callback(err, result);
    });
  },

  createOneRow: function(table, values, callback) {
    const query = 'INSERT INTO ?? SET ?;';
    connection.query(query, [[table], values], (err, result) => {
      callback(err, result);
    });
  },

  deleteOneRow: function(table, value, callback) {
    const query = 'DELETE FROM ?? WHERE ?; ';
    connection.query(query, [[table], value], (err, result) => {
      callback(err, result);
    });
  },

  updateOneRow: function(table, setValue, whereValue, callback) {
    const query = 'UPDATE ?? SET ? WHERE ?';
    connection.query(query, [[table], setValue, whereValue], (err, result) => {
      callback(err, result);
    });
  }
};
