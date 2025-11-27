const {
    modelFields,
    getAllRecords,
    saveRecord,
    removeRecord,
} = require('../models/products.model');


async function showAllRecords(req,res) {
    try{
        const model = req.baseUrl.replace('/','');
        return res.status(200).json(await getAllRecords(model));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function addNewRecord(req,res) {
    const input = req.body;
    const model = req.baseUrl.replace('/','');
    const fields = modelFields[model];
    for (let field of fields) {
        if(!input[field]) {
            return res.status(422).json({error: `${field} is required`});
        }
    }
    try {
        res.status(201).json(await saveRecord(model,input));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function deleteRecord(req,res) {
    const id = parseInt(req.params.id);
    const model = req.baseUrl.replace('/','');
    try{
        res.status(200).json(await removeRecord(model,id));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}



module.exports = {
    showAllRecords,
    addNewRecord,
    deleteRecord,
};