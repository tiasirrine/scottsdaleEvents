const Product = require('../models/Product');

module.exports = {
  // creates new product

  create: function(req, res) {
    Product.create(req.body)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // finds all products
  findAll: function(req, res) {
    Product.find({})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  },

  // deletes a product
  delete: function(req, res) {
    Product.deleteOne(req.body)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
};
