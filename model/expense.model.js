const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({
    name: {type:String,required:true},
    total: Number,
    tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    out: {type:Boolean,required:true},
    desc: String,
    time: Date
},
{
    timestamps : true
})

module.exports = mongoose.model('expense',ExpenseSchema)
