const jwt = require('jsonwebtoken')

const checkLogin = (req, res, next) =>{
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { id, email, username} = decoded;
        req.username = username;
        req.id = id;
        req.email = email;
        next();
        
    } catch (error) {
        next("authentication failed");
    }

}

module.exports = checkLogin;