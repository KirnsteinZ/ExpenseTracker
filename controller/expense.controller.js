const Model = require('../model/expense.model');
const moment = require('moment');

const findToday = async (req,res) => {
    const today = moment().startOf('day')
    Model.find({
        createdAt: {
          $gte: moment().startOf('day').toDate(),
          $lte: moment(today).endOf('day').toDate()
        }
    }).then(data => res.json(data))
    .catch((error)=>{
        console.log('Error : ', error);
        res.status(500).json({ error:error});
    })
}

const countToday = async (req,res) => {
    const today = moment().startOf('day')
    Model.find({
        createdAt: {
          $gte: moment().startOf('day').toDate(),
          $lte: moment(today).endOf('day').toDate()
        }
    })
    .then(data => {
        var total = 0;
        for (let index = 0; index < data.length; index++) {
            total += data[index].total?data[index].total:0;
        }
        res.json({total})
    })
    .catch((error)=>{
        console.log('Error : ', error);
        res.status(500).json({ error:error});
    })
}

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
    })}

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

const graphqlRead = async () => await Model.find({});

const graphqlGetById = (id) => Model.findById(id).then(data => { return data });

const graphqlCreate = async (input) => {
    input.id = null;
    input.time = new Date();
    var expense = new Model(input)
    expense.save()
    .then(data => { return data })
    .catch((error)=>{
        console.log('Error : ', error);
        return error;
    })
}

const graphqlUpdate = async (input) => {
    Model.findByIdAndUpdate(input.id,input)
    .then(data => { console.log(data); return data })
    .catch((error)=>{
        console.log('Error : ', error);
        return error;
    })
}

const graphqlDelete = async (id) => {
    Model.findByIdAndDelete(id)
    .then(data => { return data })
    .catch((error)=>{
        console.log('Error : ', error);
        return error;
    })
}

module.exports = {
    findAll,
    create,
    update,
    remove,
    graphqlRead,
    graphqlGetById,
    graphqlCreate,
    graphqlUpdate,
    graphqlDelete,
    findToday,
    countToday
}