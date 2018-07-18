const Cart_products = require('../models/Cart_products');

module.exports = {
  saveProductToCart: function(product) {
    // customer_cart_id, product_id, qty
    return new Promise((resolve, reject) => {
      Cart_products.create(product)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
