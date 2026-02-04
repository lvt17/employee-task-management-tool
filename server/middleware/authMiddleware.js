const tokenService = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const  token = authHeader && authHeader.split(' ')[1];
    
    if(!token) return res.status(401).json({message: "missing token"});
    
    try {
        
        const decoded = tokenService.validateToken(token);

        req.user = decoded;

        next();

    }catch(err) {

        return res.status(403).json({message: "Invaild token"})

    };  
}

module.exports = {authMiddleware}


