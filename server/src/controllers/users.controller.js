const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const {
    userModelFields,
    emailCheck,
    registerUser,    
} = require('../models/users.model');



async function register(req,res) {
    const input= req.body;
    for (let field of userModelFields) {
        if(!input[field]) {
            return res.status(422).json({error: `${field} is require`})
        }
    }
    const registeredEmail = await emailCheck(input.email);
    if(!registeredEmail) {
        const hashedPassword = await bcrypt.hash(input.password,10);
        const newuser = Object.assign(input, {password: hashedPassword});
        try {
            return res.status(201).json(await registerUser(newuser));
        } catch(err) {
            return res.status(500).json({error: err.message})
        }
    } else {
        return res.status(400).json({error: 'this email is already registered'});
    }  
}

async function login(req,res) {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(422).json({error: 'all fields are require'});
    }
    const user = await emailCheck(email);
    const passwordCheck = await bcrypt.compare(password,user.password);
    if(user && passwordCheck) {
        const accessToken = jwt.sign({
            id : user.id,
            firstName : user.firstName,
            lastName : user.lastName,
            email: user.email
        },process.env.access_token_secret,
        {expiresIn: "10m"});
        return res.status(200).json({accessToken,result:"successful"})
    } else {
        return res.status(500).json({error: "email or password is not valid"});
    }
}


async function validateToken(req,res,next) {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        if(!token) {
            return res.status(500).json({error: "token is missing"});
        }
        jwt.verify(token,process.env.access_token_secret,(error,decoded)=>{
            if(error) {
                return res.status(401).json({error: "user have not authenticated"});
            }
            req.user = decoded;
            next();
        });
    };
};



module.exports = {
    register,
    login,
    validateToken,
}