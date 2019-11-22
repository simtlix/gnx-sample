const graphql = require('graphql')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString
} = graphql

const ISBNType = new GraphQLObjectType({
  name: 'ISBN',
  fields: () => ({
    country: { type: GraphQLString },
    number: { type: GraphQLString }
  })
})

gnx.addNoEndpointType(ISBNType)

module.exports = ISBNType
