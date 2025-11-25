const {
    addNewCategory
} = require('../controllers/product.controller');

const express = require('express');

const categoryRouter = express.Router();

categoryRouter.post('/add',addNewCategory);



module.exports = {
    categoryRouter,
};