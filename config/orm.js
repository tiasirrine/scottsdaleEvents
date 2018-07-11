const connection = require('./connection');

module.exports = {
  selectDistinct: function(table, callback) {
    const query = 'SELECT DISTINCT CATEGORY FROM ??;';
    connection.query(query, [table], (err, result) => {
      callback(err, result);
    });
  },

  selectAll: function(table, column, value, callback) {
    const query = 'SELECT * FROM ?? WHERE ??=?;';
    connection.query(query, [[table], [column], [value]], (err, result) => {
      callback(err, result);
    });
  },

  createOneRow: function(table, columns, value, callback) {
    const query = 'INSERT INTO ?? set ?? = ? ';
    connection.query(query, [
      [table],
      [columns],
      [value],
      (err, result) => {
        callback(err, result);
      }
    ]);
  },

  deleteOneRow: function(table, column, value, callback) {
    const query = 'DELETE FROM ?? WHERE ??=?; ';
    connection.query(query, [
      [table],
      [column],
      [value],
      (err, result) => {
        callback(err, result);
      }
    ]);
  },

  updateOneRow: function(table, column, value, callback) {
    const query = 'UPDATE ?? SET ?? WHERE ?';
    connection.query(query, [
      [table],
      [column],
      [value],
      (err, result) => {
        callback(err, result);
      }
    ]);
  }
};
