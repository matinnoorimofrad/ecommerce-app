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

async function saveRecord(model,record) {
    return await prisma[model].create({data: record});
}

async function removeRecord(model,recordID) {
    return await prisma[model].delete({where: {id: recordID}});
}



module.exports = {
    modelFields,
    getAllRecords,
    saveRecord,
    removeRecord,
}