const graphql = require('graphql')
const gnx = require('@simtlix/gnx')
const Category = require('../models/category')

const {
  GraphQLObjectType, GraphQLString, GraphQLID
} = graphql

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

gnx.connect(Category, CategoryType, 'category', 'categories')

module.exports = CategoryType
