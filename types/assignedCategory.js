const graphql = require('graphql')
const CategoryType = require('./category')
const Category = require('../models/category')
const gnx = require('@simtlix/gnx')

const {
  GraphQLObjectType, GraphQLString
} = graphql

const AssignedCategoryType = new GraphQLObjectType({
  name: 'AssignedCategory',
  fields: () => ({
    name: { type: GraphQLString },
    category: {
      type: CategoryType,
      extensions: {
        relation: {
          embedded: false,
          connectionField: 'category_ID'
        }
      },
      resolve (parent, args) {
        return Category.findById(parent.category_ID)
      }
    }
  })
})

gnx.addNoEndpointType(AssignedCategoryType)

module.exports = AssignedCategoryType
