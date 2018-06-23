const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductSchema);
