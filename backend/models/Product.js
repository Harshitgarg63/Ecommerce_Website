// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a product name"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  stock: {
    type: Number,
    required: [true, "Please add the stock quantity"],
    default: 0,
  },
  image: {
    type: String,
    default: "https://placehold.co/400x300/f3f4f6/000000?text=Product",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
