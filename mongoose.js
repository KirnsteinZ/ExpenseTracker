const Mongoose = require('mongoose');
var mongoUrl = null;
var db = null;

const mongoose = async (url) => {
    mongoUrl = url;
    db = await Mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true});
    console.log('Connected to mongodb')
}

const expense = require('./model/expense.model')(Mongoose)
const tag = require('./model/tag.model')(Mongoose)
const category = require('./model/category.model')(Mongoose)

const getExpense = () => {
    return expense;
}
const getTag = () => tag;
const getCategory = () => category;
const getMongoose = () => Mongoose;

module.exports = {
    mongoose,
    getMongoose,
    getExpense,
    getTag,
    getCategory
};
