const express = require('express')
const app = express()
const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql')
const schema = buildSchema(`
type Query {
    message: String,

},
type Mutation {
}
`);

const courses = require('./data')


const root = {
    message: () => {
        return 'Hella GraphQL'
    },
}

app.use('/graphql',expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000,()=>{console.log('Server is up')})

