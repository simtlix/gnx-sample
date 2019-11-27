const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const City = require('../models/city')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList
} = graphql

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  embedded: true,
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    city: {
      type: CityType,
      extensions: {
        relation: {
          connectionField: 'cityID'
        }
      },
      resolve (parent, args) {
        return City.findById(parent.cityID)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      extensions: {
        relation: {
          connectionField: 'authorID'
        }
      },
      resolve (parent, args) {
        return Book.find({ authorID: parent.id })
      }
    }
  })
})

gnx.connect(Author, AuthorType, 'author', 'authors')

module.exports = AuthorType

const BookType = require('./book')
const CityType = require('./city')
