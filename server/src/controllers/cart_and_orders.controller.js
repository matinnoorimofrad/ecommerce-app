const {
    getCart,
    saveCartItem,
    removeItem,
    makeOrder,
    getOrders,
    getOneOrder,
    removeOrder,    
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

async function order(req,res) {
    const userID = req.user.id;
    try {
        res.status(201).json(await makeOrder(userID));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function showOrders(req,res) {
    const userID = req.user.id;
    try {
        res.status(200).json(await getOrders(userID));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function showOneOrder(req,res) {
    const userID = req.user.id;
    const id = req.params.id;
    try {
        res.status(200).json(await getOneOrder(userID,id));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

async function cancelOrder(req,res) {
    const userID = req.user.id;
    const id = req.params.id;
    try {
        res.status(200).json(await removeOrder(userID,id));
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};



module.exports = {
    showCart,
    addToCart,
    removeCartItem,
    order,
    showOrders,
    showOneOrder,
    cancelOrder,
};