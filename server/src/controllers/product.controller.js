const {
    saveRecord
} = require('../models/products.model');

async function addNewCategory(req,res) {
    const {name} = req.body;
    if(!name) {
        return res.status(422).json({error: "category name is required"});
    }
    try {
        res.status(201).json(await saveRecord("category",req.body));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};



module.exports = {
    addNewCategory
};