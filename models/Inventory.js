const orm = require('../config/orm');

module.exports = {
  selectDistinctCategory: function(table, callback) {
    orm.selectDistinct(table, (err, result) => {
      callback(err, result);
    });
  },

  selectAllCategoryProducts: function(table, column, value, callback) {
    orm.selectAll(table, column, value, (err, result) => {
      callback(err, result);
    });
  }
};
