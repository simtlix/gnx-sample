const graphql = require('graphql')
const ISBNType = require('./isbn')
const AssignedCategoryType = require('./assignedCategory')
const Author = require('../models/author')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLInt, GraphQLList, GraphQLEnumType
} = graphql

const BookState = new GraphQLEnumType({
  name: 'BookState',
  values: {
    ACTIVE: {
      value: 'ACTIVE'
    },
    INACTIVE: {
      value: 'INACTIVE'
    }
  }
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  /* We are wrapping fields in the function as we don't want to execute this until
  everything is initialized. For example below code will throw error AuthorType not
  found if not wrapped in a function */
  fields: () => ({
    id: {
      type: GraphQLID
    },
    state: { type: BookState },
    rootBook: {
      type: BookType,
      extensions: {
        relation: {
          connectionField: 'rootBook',
          embedded: false
        }
      },
      resolve (parent) {
        return gnx.getModel(BookType).find({ _id: parent.rootBook })
      }
    },
    childBooks: {
      type: new GraphQLList(BookType),
      extensions: {
        relation: {
          embedded: false,
          connectionField: 'rootBook'
        }
      },
      resolve (parent) {
        return gnx.getModel(BookType).find({ rootBook: parent._id })
      }
    },
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

module.exports = BookType
const stateMachine = {
  initialState: BookState._nameLookup.INACTIVE,
  actions: {
    inactivate: {
      from: BookState._nameLookup.ACTIVE,
      to: BookState._nameLookup.INACTIVE,
      action: async (params) => {
        console.log(JSON.stringify(params))
      }
    },
    activate: {
      from: BookState._nameLookup.INACTIVE,
      to: BookState._nameLookup.ACTIVE,
      action: async (params) => {
        console.log(JSON.stringify(params))
      }
    }
  }
}

const AuthorType = require('./author')
gnx.connect(null, BookType, 'book', 'books', null, null, stateMachine)
