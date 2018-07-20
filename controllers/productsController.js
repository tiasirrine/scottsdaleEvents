const db = require('../models');

module.exports = {
  selectAllCategories: function() {
    return db.Product.findAll({ attributes: ['category'], group: 'category' })
      .then(result => result)
      .catch(error => {
        throw error;
      });
  },

  selectAllProductsByCategory: function(category) {
    return db.Product.findAll({ where: { category: category } })
      .then(result => result)
      .catch(error => {
        throw error;
      });
  },

  selectAll: function() {
    return db.Product.findAll({})
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }
};
