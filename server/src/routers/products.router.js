const {
    showAllRecords,
    addNewRecord,
    deleteRecord,
    updateOneRecord,
    brandFilter,
    platformFilter,
    priceFilter,
} = require('../controllers/products.controller');

const express = require('express');

const { validateToken } = require('../controllers/users.controller');

const categoryRouter = express.Router();
const consoleRouter = express.Router();
const gameRouter = express.Router();

categoryRouter.use(validateToken);
consoleRouter.use(validateToken);
gameRouter.use(validateToken);

categoryRouter.get('/all',showAllRecords);
categoryRouter.post('/add',addNewRecord);
categoryRouter.delete('/remove/:id',deleteRecord);
categoryRouter.patch('/update/:id',updateOneRecord);

consoleRouter.get('/all',showAllRecords);
consoleRouter.post('/add',addNewRecord);
consoleRouter.post('/brandFilter',brandFilter);
consoleRouter.post('/priceFilter',priceFilter);
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