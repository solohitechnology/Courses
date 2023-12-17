const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String, 
  },
  pdfFile: {
    type: String, 
  },
});

const Book = mongoose.model('Book1', bookSchema);

module.exports = Book;
