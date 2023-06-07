const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    let token = req.headers.authorization;
     jwt.verify(token, "Mock9", (err, decoded) => {
            if (err) {
                res.send({ "msg": "Invalid token" })
            }
           next();
        });
    
}

module.exports = authentication;