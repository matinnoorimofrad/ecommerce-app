const prisma = require('../prismaClient');

const userModelFields = ["firstName","lastName","email","password"];

async function emailCheck(email) {
    return await prisma.user.findUnique({
        where: {email}
    });
};

async function registerUser(newuser) {
    return await prisma.user.create({data: newuser}); 
};









module.exports = {
    userModelFields,
    emailCheck,
    registerUser,
}