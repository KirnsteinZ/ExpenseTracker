const Model = require('../model/category.model');

const findAll = async (req,res) => {
    try {
        const data = await Model.find({});
        res.json({'data' : data});
    } catch (error) {
        console.log('Error : ', error);
        res.status(500).json({ error:err});
    }
}

const create = async (req,res) => {
    var expense = new Model(req.body)
    expense.save()
    .then((data) => res.json(expense))
    .catch((error)=>{
        console.log('Error : ', error);
        res.status(500).json({ error:error});
    })
}

const updateOne = async (req,res) => {
    Model.findById(req.body.id)
        .then((data) => {
            data.name = req.body.name==null?data.name:req.body.name
            data.species = req.body.species==null?data.species:req.body.species
            data.save();
            res.json(data)
        })
        .catch((error)=>{
            console.log('Error : ', error);
            res.status(500).json({ error:error});
        })

};

const update = async (req,res) => {
    Model.findByIdAndUpdate(req.body.id,{$set : req.body},{new: true, useFindAndModify: false})
    .then((pet) => {
        if(!pet) res.status(500).json({ error:"ID not found"});
        res.json(pet);
    })
    .catch((error)=>{
        console.log('Error : ', error);
        res.status(500).json({ error:error});
    })}

const remove = async (req,res) => {
    Model.findByIdAndDelete(req.body.id)
    .then((data) => {
        res.json(data);
    })
    .catch((error)=>{
        console.log('Error : ', error);
        res.status(500).json({ error:error});
    })
}

module.exports = {
    findAll,
    create,
    update,
    remove
}