const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: String
})

const Category = mongoose.model('Category', categorySchema, 'category')
Category.createCollection()
module.exports = Category
