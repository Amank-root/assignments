const jwt = require('jsonwebtoken')
const jwt_secret = "usertopsecret"

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization?.split(" ")[1];
    const checkToken = jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            return false
        }
        return true
    });
    if(checkToken){
        next()
    }else{
        res.status(403).json({User: "User not found!"})
    }

}

module.exports = userMiddleware;