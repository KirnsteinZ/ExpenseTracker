const express = require('express');
const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');
const bodyParser = require('body-parser');

const url = 'mongodb+srv://user1:Test1234@cluster0-rluxm.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('./mongoose');
mongoose.mongoose(url);

const app = express();
app.use(bodyParser());

const port = process.env.PORT || 3000;

const schema = buildSchema(`
type Category {
    name: String,
    desc: String
},
type Tag {
    name: String,
    desc: String
},
type Express {
    name: String,
    tag: [Tag],
    category: Category,
    out: Boolean,
    desc: String
},
type Query {
    message: String
}
`); 

const root = {

}

app.use('/graphql',expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port,()=>{console.log('Server is up')})

app.get('/',(req,res) => res.send('Hallo, Selamat datang ke website ku'))
app.get('/test', (req,res) => res.send("hallo"))

require('./route/expense.route')(app,mongoose.getExpense());
require('./route/tag.route')(app,mongoose.getExpense());
require('./route/category.route')(app,mongoose.getExpense());