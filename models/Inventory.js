const orm = require('../config/orm');

module.exports = {
  // TODO: rename to selectAllCategories
  selectAllAndGroupBy: function(callback) {
    orm.selectAllAndGroupBy(null, null, function(res) {
      callback(res);
    });
  },

  selectAllCategoryProducts: function(table, column, value, callback) {
    orm.selectAllByColumnValue(table, column, value, function(res) {
      callback(res);
    });
  },

  selectAllInventoryItems: function(table, callback) {
    orm.selectAll(table, function(res) {
      callback(res);
    });
  }
};
