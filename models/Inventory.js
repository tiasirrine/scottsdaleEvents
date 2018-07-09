const orm = require('../config/orm');

module.exports = {
  selectAllAndGroupBy: function(callback) {
    orm.selectAllAndGroupBy(null, null, function(res) {
      callback(res);
    });
  }
};
