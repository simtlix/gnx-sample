const graphql = require('graphql')
const gnx = require('@simtlix/gnx')
const ISBNCodeType = require('./isbnCode')
const {
  GraphQLObjectType, GraphQLString
} = graphql

const ISBNType = new GraphQLObjectType({
  name: 'ISBN',
  fields: () => ({
    country: { type: GraphQLString },
    number: { type: GraphQLString },
    code: {
      type: ISBNCodeType,
      extensions: {
        relation: {
          embedded: true
        }
      },
      resolve (parent) {
        return parent.code
      }
    }
  })
})

gnx.addNoEndpointType(ISBNType)

module.exports = ISBNType
