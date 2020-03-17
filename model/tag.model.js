var expense = (mongoose) => {
    const TagSchema = mongoose.Schema({
        name: {type:String,required:true},
        desc: String
    },
    {
        timestamps : true
    })
    module.exports = mongoose.model('tag',TagSchema)
};

module.exports = expense;