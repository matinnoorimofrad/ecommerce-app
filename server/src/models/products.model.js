const prisma = require('../prismaClient');

const modelFields = {
    category: ["name"],
    console: ["brand","model","storage"],
    game: ["name","platform","genres","description"],
}

async function getAllProducts() {
    return await prisma.product.findMany({include: {
        console: true,
        game: true
    }});
};

async function getOneProduct(productID) {
    return await prisma.product.findUnique({
        where: {id: productID}
    });
};

async function getOneTypeOfProduct(model){
    const categoryID = await prisma.category.findUnique({
        where: {name: model},
        select: {id}
    });
    return await prisma.product.findMany({
        where: {categoryID},
        include: {
            model: true
        }
    });
};

async function getAllCategories() {
    return await prisma.category.findMany({});
}

async function saveRecord(model,record) {
    return await prisma[model].create({data: record});
};


async function removeRecord(model,recordID) {
    return await prisma[model].delete({where: {id: recordID}});
};

async function updateRecord(model,recordID,updatedRecord) {
    return await prisma[model].update({
        where: {id: recordID},
        data: updatedRecord
    });
};

async function filterByBrand(brand) {
    const categoryID = await prisma.category.findUnique({
        where: {name: "console"}
    })
    return await prisma.product.findMany({
        where: {categoryID, console: {brand},include: {
            console: true
        }}
    }); 
};

async function filterByPlatform(platform) {
    const categoryID = await prisma.category.findUnique({
        where: {name: "game"}
    });
    return await prisma.product.findMany({
        where: {categoryID, game:{platform},include: {
            game: true
        }}
    });
};

async function filterByPrice(model,minPrice,maxPrice) {
    const categoryID = await prisma.category.findUnique({
        where: {name: model}
    }) 
    return await prisma.product.findMany({
        where: {categoryID, price: {
            gte: minPrice,
            lte: maxPrice
        }}
    });
};



module.exports = {
    modelFields,
    getAllProducts,
    getOneProduct,
    getOneTypeOfProduct,
    getAllCategories,
    saveRecord,
    removeRecord,
    updateRecord,
    filterByBrand,
    filterByPlatform,
    filterByPrice,
}