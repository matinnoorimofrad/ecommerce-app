const {
    showCart,
    addToCart,
    removeCartItem,
} = require('../controllers/cart_and_orders.controller');

const express = require('express');
const {validateToken} = require('../controllers/users.controller');

const cartRouter = express.Router();

cartRouter.use(validateToken);

cartRouter.get('/',showCart);
cartRouter.post('/add',addToCart);
cartRouter.delete('/remove/:id',removeCartItem);




module.exports = {
    cartRouter
};