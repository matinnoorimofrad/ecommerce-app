const {
    getCart,
    saveCartItem,
    removeItem
} = require('../models/cart_and_orders.model');

async function showCart(req,res) {
    const userID = req.user.id;
    try {
        res.status(200).json(await getCart(userID));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function addToCart(req,res) {
    const {name, quantity, productID} = req.body;
    const userID = req.user.id;
    try {
        res.status(201).json(await saveCartItem(name,quantity,productID,userID));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function removeCartItem(req,res) {
    const userID = req.user.id;
    const id = req.params.id;
    try {
        res.status(200).json(await removeItem(userID,id));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};



module.exports = {
    showCart,
    addToCart,
    removeCartItem,
};