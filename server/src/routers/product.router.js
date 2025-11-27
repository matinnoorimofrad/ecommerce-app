const {
    showAllRecords,
    addNewRecord,
    deleteRecord,
} = require('../controllers/product.controller');

const express = require('express');

const categoryRouter = express.Router();

categoryRouter.get('/all',showAllRecords);
categoryRouter.post('/add',addNewRecord);
categoryRouter.delete('/remove/:id',deleteRecord);




module.exports = {
    categoryRouter,
};