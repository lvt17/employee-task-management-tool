const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES}); 
}

const validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        throw new Error("Invaild token");
    }
}

module.exports = {generateToken, validateToken}