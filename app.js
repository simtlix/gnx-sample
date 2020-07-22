const express = require('express')
const graphqlHTTP = require('express-graphql')
const gnx = require('@simtlix/gnx')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/example', { replicaSet: 'rs', useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
  console.log('connected to database')
})

require('./types')

/* This route will be used as an endpoint to interact with Graphql,
All queries will go through this route. */
const schema = gnx.createSchema()
app.use('/graphql', graphqlHTTP({
  // Directing express-graphql to use this schema to map out the graph
  schema,
  /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
  which provides an interface to make GraphQl queries */
  graphiql: true,
  formatError: gnx.buildErrorFormatter((err) => {
    console.log(err)
  })

}))

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
