const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: [true, 'Product already exists']
  },
  price: {
    type: Number,
    required: [true, 'A price is required for the product']
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  image: { type: String, required: [true, 'An image is required'] }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
