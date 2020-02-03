const graphql = require('graphql')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString
} = graphql

const ISBNCodeType = new GraphQLObjectType({
  name: 'ISBNCode',
  fields: () => ({
    codeType: { type: GraphQLString },
    number: { type: GraphQLString }
  })
})

gnx.addNoEndpointType(ISBNCodeType)

module.exports = ISBNCodeType
