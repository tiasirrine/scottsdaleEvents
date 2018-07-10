const connection = require('./connection');

module.exports = {
  selectAllAndGroupBy: function(table, column, callback) {
    const query = 'SELECT CATEGORY FROM inventory GROUP BY CATEGORY;';

    connection.query(query, function(err, result) {
      if (err) throw err.stack;
      callback(result);
    });
  },
  selectAllByColumnValue: function(table, column, value, callback) {
    const query = 'SELECT * FROM ?? WHERE ??=?;';

    connection.query(query, [[table], [column], [value]], function(
      err,
      result
    ) {
      if (err) throw err.stack;
      callback(result);
    });
  }
};
