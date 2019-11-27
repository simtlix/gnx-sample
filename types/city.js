const graphql = require('graphql')
const Author = require('../models/author')
const City = require('../models/city')

const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString, GraphQLID,
  GraphQLInt, GraphQLList
} = graphql

const CityType = new GraphQLObjectType({
  name: 'CityType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    population: { type: GraphQLInt },
    authors: {
      type: new GraphQLList(AuthorType),
      extensions: {
        relation: {
          connectionField: 'cityID'
        }
      },
      resolve (parent, args) {
        return Author.find({ cityID: parent.id })
      }
    }
  })
})

gnx.connect(City, CityType, 'author', 'authors')

module.exports = CityType

const AuthorType = require('./author')
