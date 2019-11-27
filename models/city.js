const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  name: String,
  population: Number
})
const City = mongoose.model('City', citySchema, 'city')
City.createCollection()
module.exports = City
