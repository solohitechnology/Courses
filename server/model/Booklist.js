const mongoose = require('mongoose');

// Define a schema for the Book model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  imageUrl: String,
  pdfUrl: String, // New field for storing the URL of the uploaded PDF
});

// Create the Book model
const Booklist = mongoose.model('Booklist', bookSchema);

module.exports = Booklist;
