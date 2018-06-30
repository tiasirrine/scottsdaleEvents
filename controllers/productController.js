const Product = require('../models/Product');

module.exports = {
  // creates new product
  create: function(product) {
    Product.create(product)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // finds all products
  findAll: function() {
    Product.find({})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // deletes a product
  delete: function(product) {
    Product.deleteOne(product)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
};
