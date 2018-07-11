const connection = require('./connection');

module.exports = {
  selectDistinct: function(table, callback) {
    const query = 'SELECT DISTINCT CATEGORY FROM ??;';
    connection.query(query, [table], function(err, result) {
      callback(err, result);
    });
  },

  selectAllByColumnValue: function(table, column, value, callback) {
    const query = 'SELECT * FROM ?? WHERE ??=?;';
    connection.query(query, [[table], [column], [value]], function(
      err,
      result
    ) {
      callback(err, result);
    });
  },

  createOne: function(table, column, value, callback) {
    const query = 'SELECT ';
  }
};
