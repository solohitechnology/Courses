const mongoose = require('mongoose');

// Connect to MongoDB


// Create a mongoose model for books
const BookSchema = new mongoose.Schema({
  category: String,
  title: String,
  price: String, // Assuming 'price' is a string; update to Number if it's a numeric value
  author: String,
  description: String,
  pages: Number,
  size: Number,
  date: Date,
  pdf: String,
  picture: String,
  popularity: { type: Number, default: 0 },
});

const Books = mongoose.model('Book3', BookSchema);

module.exports = Books;
