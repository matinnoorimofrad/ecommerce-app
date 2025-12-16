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

module.exports = {
    getCart,
    saveCartItem,
    removeItem
}