const graphql = require('graphql')
const ISBNType = require('./isbn')
const AssignedCategoryType = require('./assignedCategory')
const Author = require('../models/author')
const Book = require('../models/book')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt, GraphQLList
} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  /* We are wrapping fields in the function as we don't want to execute this until
  everything is initialized. For example below code will throw error AuthorType not
  found if not wrapped in a function */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt },
    ISBN: {
      type: ISBNType,
      extensions: {
        relation: {
          embedded: true
        }
      }
    },
    categories: {
      type: new GraphQLList(AssignedCategoryType),
      extensions: {
        relation: {
          embedded: true
        }
      },
      resolve (parent, args) {
        return parent.categories
      }
    },
    author: {
      type: AuthorType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: 'authorID'
        }
      },
      resolve (parent, args) {
        return Author.findById(parent.authorID)
      }
    }
  })
})

gnx.connect(Book, BookType, 'book', 'books')

module.exports = BookType

const AuthorType = require('./author')
