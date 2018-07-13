const Products = require('../models/Products');

module.exports = {
  selectAllCategories: function() {
    return Products.findAll({ attributes: ['category'], group: 'category' })
      .then(result => result)
      .catch(error => {
        throw error;
      });
  },

  selectAllProductsByCategory: function(category) {
    return Products.findAll({ where: { category: category } })
      .then(result => result)
      .catch(error => {
        throw error;
      });
  }
};
