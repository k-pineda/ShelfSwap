const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  condition: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

bookSchema.index({ title: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
