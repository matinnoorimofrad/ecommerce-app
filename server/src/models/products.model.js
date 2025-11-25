const { PrismaClient } = require('../../prisma/generated/client');
const prisma = new PrismaClient();

async function saveRecord(model,record) {
    return await prisma[model].create({data: record});
}



module.exports = {
    saveRecord
}