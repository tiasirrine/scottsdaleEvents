const db = {};

db.admins = require('./Admins');
db.cart_products = require('./Cart_products');
db.customers = require('./Customers');
db.products = require('./Products');
db.carts = require('./Carts');

db.customers.hasMany(db.carts);
db.carts.belongsTo(db.customers);

module.exports = db;
