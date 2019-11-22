const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
  name: String,
  age: Number
})
const Author = mongoose.model('Author', authorSchema, 'author')
Author.createCollection()
module.exports = Author
