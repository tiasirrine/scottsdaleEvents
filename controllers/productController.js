const db = require('../models');

module.exports = {
  selectAll: function() {
    return db.Product.findAll({})
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }
};
