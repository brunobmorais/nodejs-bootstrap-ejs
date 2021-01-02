const jwtwebtoken = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports.create = (id) =>{
    console.log(CONFIG.jwt_encryption);
    return jwtwebtoken.sign({ id: id}, CONFIG.jwt_encryption, {expiresIn: CONFIG.jwt_expiration});
};

module.exports.verify = (req, res, next) => {
    var token = req.get("authorization");
    if (token){
        // remove "Bearer "
        token = token.slice(7);
        console.log(token);
        jwtwebtoken.verify(token, CONFIG.jwt_encryption, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid or expired token"
                });
            } else {
                next();
            }
        });

    } else {
        return res.status(401).json({
            error: true,
            message: "access denied!",
        });
    }

};