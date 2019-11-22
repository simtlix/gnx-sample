const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  pages: Number,
  authorID: mongoose.Schema.Types.ObjectId,
  ISBN: {
    country: String,
    number: String
  },
  categories: [{
    name: String,
    category_ID: mongoose.Schema.Types.ObjectId
  }]
})

const Book = mongoose.model('Book', bookSchema, 'book')
Book.createCollection()

module.exports = Book
