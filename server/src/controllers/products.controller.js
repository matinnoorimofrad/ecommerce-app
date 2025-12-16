const {
    modelFields,
    getAllProducts,
    getOneProduct,
    getOneTypeOfProduct,
    getAllCategories,
    saveRecord,
    removeRecord,
    updateRecord,
    filterByBrand,
    filterByPlatform,
    filterByPrice,
} = require('../models/products.model');


async function showAllProducts(req,res) {
    try{
        return res.status(200).json(await getAllProducts());
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function showOneProduct(req,res) {
    const id = parseInt(req.params.id);
    try{
        return res.status(200).json(await getOneProduct(id));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function showOneTypeOfProduct(req,res) {
    const model = req.params.model;
    try {
        return res.status(200).json(await getOneTypeOfProduct(model))
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function addNewProduct(req,res) {
    const newProduct = req.body;
    const model = req.params.model;
    const fields = modelFields[model];
    for (let field of fields) {
        if (!newProduct.model[field]) {
            return res.status(422).json({error: `${field} is require`})
        }
    }
    if (!newProduct.price) {
        return res.status(422).json({error: "price is require"})
    }
    try {
        return res.status(201).json(await saveRecord("product",newProduct));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function removeProduct(req,res) {
    const id = parseInt(req.params.id);
    try {
        return res.status(200).json(await removeRecord("product",id));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function updateProduct(req,res) {
    const id = parseInt(req.params.id);
    const updatedRecord = req.body;
    try {
        return res.status(200).json(await updateRecord("product",id,updatedRecord));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function showAllCategories(req,res) {
    try {
        return res.status(200).json(await getAllCategories());
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function addNewCategory(req,res) {
    const newCategory = req.body;
    if (!newCategory.name) {
        return res.status(422).json({error: "category name is require"});
    }
    try {
        return res.status(201).json(await saveRecord("category",newCategory));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
    
};

async function removeCategory(req,res) {
    const id = parseInt(req.params.id);
    try{
        return res.status(200).json(await removeRecord("category",id));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function updateCategory(req,res) {
    const id = parseInt(req.params.id);
    const updatedRecord = req.body;
    try{
        return res.status(200).json(await updateRecord("category",id,updatedRecord));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function brandFilter(req,res) {
    const brand = req.body.brand;
    try {
        return res.status(200).json(await filterByBrand(brand));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function platformFilter(req,res) {
    const platform = req.body.platform;
    try {
        return res.status(200).json(await filterByPlatform(platform));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

async function priceFilter(req,res) {
    const {minPrice, maxPrice}= req.body;
    const model = req.params.model;
    try {
        return res.status(200).json(await filterByPrice(model,minPrice,maxPrice));
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
};

// async function gamePriceFilter(req,res) {
//     const {minPrice, maxPrice}= req.body;
//     try {
//         return res.status(200).json(await filterByPrice("game",minPrice,maxPrice));
//     } catch(err) {
//         return res.status(500).json({error: err.message});
//     }
// };

module.exports = {
    showAllProducts,
    showOneProduct,
    showOneTypeOfProduct,
    addNewProduct,
    removeProduct,
    updateProduct,
    showAllCategories,
    addNewCategory,
    removeCategory,
    updateCategory,
    brandFilter,
    platformFilter,
    priceFilter
};