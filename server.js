const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

//settingan atlas db
// const url = 'mongodb+srv://user1:Test1234@cluster0-rluxm.mongodb.net/test?retryWrites=true&w=majority';

//settingan local
const url = 'mongodb://localhost:27017/learning-mongodb';

const mongoose = require('./mongoose');
mongoose.mongoose(url);

const app = express();
app.use(bodyParser());

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log('Server is up')})

app.get('/',(req,res) => res.send('Hallo, Selamat datang ke website ku'))
app.get('/test', (req,res) => res.send("hallo"))

const categoryController = require('./controller/category.controller');
const expenseController = require('./controller/expense.controller');
const tagController = require('./controller/tag.controller');

require('./route/expense.route')(app,expenseController);
require('./route/tag.route')(app,tagController);
require('./route/category.route')(app,categoryController);