const {
    showAllRecords,
    addNewRecord,
    deleteRecord,
    updateOneRecord,
    brandFilter,
    platformFilter,
    priceFilter,
} = require('../controllers/product.controller');

const express = require('express');

const categoryRouter = express.Router();
const consoleRouter = express.Router();
const gameRouter = express.Router();

categoryRouter.get('/all',showAllRecords);
categoryRouter.post('/add',addNewRecord);
categoryRouter.delete('/remove/:id',deleteRecord);
categoryRouter.patch('/update/:id',updateOneRecord);

consoleRouter.get('/all',showAllRecords);
consoleRouter.post('/add',addNewRecord);
consoleRouter.post('/brandFlter',brandFilter);
consoleRouter.post('/priceFlter',priceFilter);
consoleRouter.delete('/remove/:id',deleteRecord);
consoleRouter.patch('/update/:id',updateOneRecord);

gameRouter.get('/all',showAllRecords);
gameRouter.post('/add',addNewRecord);
gameRouter.post('/platformFilter',platformFilter);
gameRouter.post('/priceFilter',priceFilter);
gameRouter.delete('/remove/:id',deleteRecord);
gameRouter.patch('/update/:id',updateOneRecord);



module.exports = {
    categoryRouter,
    consoleRouter,
    gameRouter
};