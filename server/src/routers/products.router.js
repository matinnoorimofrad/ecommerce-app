const {
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
} = require('../controllers/products.controller');

const express = require('express');

const { validateToken } = require('../controllers/users.controller');

const categoryRouter = express.Router();
const productRouter = express.Router();


categoryRouter.use(validateToken);
productRouter.use(validateToken);


categoryRouter.get('/all',showAllCategories);
categoryRouter.post('/add',addNewCategory);
categoryRouter.delete('/remove/:id',removeCategory);
categoryRouter.patch('/update/:id',updateCategory);

productRouter.get('/all',showAllProducts);
productRouter.get('/:id',showOneProduct);
productRouter.get(':model/all',showOneTypeOfProduct);
productRouter.post(':model/add',addNewProduct);
productRouter.post('console/brandFilter',brandFilter);
productRouter.post('game/platformFilter',platformFilter);
productRouter.post(':model/priceFilter',priceFilter);
productRouter.delete('/remove/:id',removeProduct);
productRouter.patch('/update/:id',updateProduct);





module.exports = {
    categoryRouter,
    productRouter,
};