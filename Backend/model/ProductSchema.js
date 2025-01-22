const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Object,
    required: true
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
