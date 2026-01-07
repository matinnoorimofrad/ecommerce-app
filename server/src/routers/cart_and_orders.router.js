const {
    showCart,
    addToCart,
    removeCartItem,
    order,
    showOrders,
    showOneOrder,
    cancelOrder,    
} = require('../controllers/cart_and_orders.controller');

const express = require('express');
const {validateToken} = require('../controllers/users.controller');

const cartRouter = express.Router();
const orderRouter = express.Router();

cartRouter.use(validateToken);
orderRouter.use(validateToken);

cartRouter.get('/',showCart);
cartRouter.post('/add',addToCart);
cartRouter.delete('/remove/:id',removeCartItem);

orderRouter.get('/',showOrders);
orderRouter.get('/:id',showOneOrder);
orderRouter.post('/make',order);
orderRouter.delete('/:id',cancelOrder);


module.exports = {
    cartRouter,
    orderRouter
};