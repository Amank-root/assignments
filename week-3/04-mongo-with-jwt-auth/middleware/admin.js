const jwt = require('jsonwebtoken')
const jwt_secret = "AdminTopSecret"

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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
        res.status(403).json({admin: "Admin not found!"})
    }

}

module.exports = adminMiddleware;