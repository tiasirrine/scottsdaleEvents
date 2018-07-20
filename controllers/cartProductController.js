const db = require('../models');

module.exports = {
  saveProductToCart: function(product) {
    // customer_cart_id, product_id, qty
    return new Promise((resolve, reject) => {
      db.CartProduct.create(product)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};