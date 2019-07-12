const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect(
  'mongodb+srv://dbowner:dbowner123@graphql-study-vmsfj.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
)
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(4000, () => {
  console.log('now listening to port 4000')
})
