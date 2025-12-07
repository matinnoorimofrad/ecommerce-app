const {
    showAllRecords,
    showOneRecord,
    addNewProduct,
    addNewCategory,
    deleteRecord,
    updateOneRecord,
    brandFilter,
    platformFilter,
    priceFilter,
} = require('../controllers/products.controller');

const express = require('express');

const { validateToken } = require('../controllers/users.controller');

const categoryRouter = express.Router();
const productRouter = express.Router();


categoryRouter.use(validateToken);
productRouter.use(validateToken);


categoryRouter.get('/all',showAllRecords);
categoryRouter.post('/add',addNewRecord);
categoryRouter.delete('/remove/:id',deleteRecord);
categoryRouter.patch('/update/:id',updateOneRecord);

productRouter.get(':model/all',showAllRecords);
productRouter.post('/add',addNewRecord);
productRouter.post('console/brandFilter',brandFilter);
productRouter.post(':model/priceFilter',priceFilter);
productRouter.delete('/remove/:id',deleteRecord);
productRouter.patch('/update/:id',updateOneRecord);





module.exports = {
    categoryRouter,
    productRouter,
};