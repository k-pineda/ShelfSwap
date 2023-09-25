const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  authors: {
    type: [String]
  },
  description: {
    type: String
  },
  showDescription:{
    type: Boolean
  },
  condition: {
    type: String
  },
  image: {
    type: String
  },
  bookId: {
    type: String,
    required:true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
