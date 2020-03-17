var expense = (mongoose) => {
    const CategorySchema = mongoose.Schema({
        name: {type:String,required:true},
        desc: String
    },
    {
        timestamps : true
    })
    module.exports = mongoose.model('category',CategorySchema)
};

module.exports = expense;