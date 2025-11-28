const {
    modelFields,
    getAllRecords,
    saveRecord,
    removeRecord,
    updateRecord,
    addProduct,
    filterByBrand,
    filterByPlatform,
    filterByPrice,
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
    if(model==="category" || model==="user") {
        try {
            return res.status(201).json(await saveRecord(model,input));
        } catch(err) {
            return res.status(500).json({error: err.message});
        }        
    } else {
        try {
            return res.status(201).json(await addProduct(model,input));
        } catch(err) {
            return res.status(500).json({error: err.message});
        }        
    }    
};

async function deleteRecord(req,res) {
    const id = parseInt(req.params.id);
    const model = req.baseUrl.replace('/','');
    try{
        return res.status(200).json(await removeRecord(model,id));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
}

async function updateOneRecord(req,res) {
    const model = req.baseUrl.replace('/','');
    const id = parseInt(req.params.id);
    const updatedRecord = req.body;

    try{
        return res.status(200).json(await updateRecord(model,id,updatedRecord));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
}

async function brandFilter(req,res) {
    const brand = req.body.brand;
    try {
        return res.status(200).json(await filterByBrand(brand));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
}

async function platformFilter(req,res) {
    const platform = req.body.platform;
    try {
        return res.status(200).json(await filterByPlatform(platform));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
}

async function priceFilter(req,res) {
    const {minPrice, maxPrice}= req.body;
    const model = req.baseUrl.replace('/','');
    try {
        return res.status(200).json(await filterByPrice(model,minPrice,maxPrice));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports = {
    showAllRecords,
    addNewRecord,
    deleteRecord,
    updateOneRecord,
    brandFilter,
    platformFilter,
    priceFilter,
};