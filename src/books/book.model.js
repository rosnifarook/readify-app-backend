const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  trending: {
    type: Boolean,
    required: [true, "Trending is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  oldPrice: Number,
  newPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
