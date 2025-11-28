const { PrismaClient } = require('../../prisma/generated/client');
const prisma = new PrismaClient();

const modelFields = {
    category: ["name"],
    console: ["brand","model","storage","price"],
    game: ["name","platform","price"],
    user: ["firstName","lastName","email","password"]
}

async function getAllRecords(model) {
    return await prisma[model].findMany({});
}

async function saveRecord(model,newRecord) {
    return await prisma[model].create({data: newRecord});
}

async function removeRecord(model,recordID) {
    return await prisma[model].delete({where: {id: recordID}});
}

async function updateRecord(model,recordID,updatedRecord) {
    return await prisma[model].update({
        where: {id: recordID},
        data: updatedRecord
    });
}

async function addProduct(model,record) {
    const category = await prisma.category.findUnique({where: {name: model}});
    const finalRecord = Object.assign(record,{categoryID: category.id});

    return await prisma[model].create({data: finalRecord});
};

async function filterByBrand(brand) {
    return await prisma.console.findMany({where: {brand}}); 
};

async function filterByPlatform(platform) {
    return await prisma.game.findMany({
        where: {name:{
            contains: platform,
            mode: "insensitive"
        }}
    });
}

async function filterByPrice(model,minPrice,maxPrice) {
    return await prisma[model].findMany({
        where: {price: {
            gte: minPrice,
            lte: maxPrice
        }}
    });
}



module.exports = {
    modelFields,
    getAllRecords,
    saveRecord,
    removeRecord,
    updateRecord,
    addProduct,
    filterByBrand,
    filterByPlatform,
    filterByPrice,
}