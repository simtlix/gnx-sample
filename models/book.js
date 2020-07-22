const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  pages: Number,
  authorID: mongoose.Schema.Types.ObjectId,
  ISBN: {
    country: String,
    number: String,
    code: {
      number: String,
      codeType: String
    }
  },
  categories: [{
    name: String,
    category_ID: mongoose.Schema.Types.ObjectId
  }]
})

const Book = mongoose.model('Book', bookSchema, 'Book')
Book.createCollection()

module.exports = Book
