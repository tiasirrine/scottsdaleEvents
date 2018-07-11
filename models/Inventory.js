const orm = require('../config/orm');

module.exports = {
  selectDistinctCategory: function(table, callback) {
    orm.selectDistinct(table, function(err, result) {
      callback(err, result);
    });
  },

  selectAllCategoryProducts: function(table, column, value, callback) {
    orm.selectAllByColumnValue(table, column, value, function(err, result) {
      callback(err, result);
    });
  }
};
