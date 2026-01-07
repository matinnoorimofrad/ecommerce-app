const prisma = require('../prismaClient');

async function getCart(userID) {
    return await prisma.cartItem.findMany({
        where: {userID}
    });
};

async function saveCartItem(name,quantity,productID,userID) {
    const product = await prisma.product.findUnique({
        where: {id: productID}
    });
    const cartItem = {
        name,
        quantity,
        price: (quantity*product.price),
        userID,
        productID
    };
    return await prisma.cartItem.create({data: cartItem});
};

async function removeItem(userID,id) {
    return await prisma.cartItem.delete({
        where: {userID,id}
    });
};

async function makeOrder(userID) {
    return await prisma.$transaction(async(tx) => {
        const cartItems = await tx.cartItem.findMany({where: {userID}});
        if (cartItems.length == 0) {
            throw new Error("the cart is empty");
        };
        const totalPrice = cartItems.reduce((sum,item) => {
            return sum + (item.price * item.quantity)
        },0);
        const order = await tx.order.create({
            data: {
                price: totalPrice,
                userID,
            }
        });
        const orderItems = await tx.orderItem.createMany({
            data: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                orderID: order.id,
                productID: item.productID
            }))
        });
        await tx.cartItem.deleteMany({where: {userID}});
        return orderItems;        
    });
};

async function getOrders(userID) {
    return await prisma.order.findMany({
        where: {userID},
        include: {orderItems: true}
    });
};

async function getOneOrder(userID,id) {
    return await prisma.order.findUnique({
        where: {userID,id},
        include: {orderItems: true}
    });
};

async function removeOrder(userID,id) {
    return await prisma.order.delete({
        where: {userID,id}
    });
};

module.exports = {
    getCart,
    saveCartItem,
    removeItem,
    makeOrder,
    getOrders,
    getOneOrder,
    removeOrder,
}