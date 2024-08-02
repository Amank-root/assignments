const {Admin} = require("../db")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const {username, password} = req.headers;
    if (cName.safeParse(username).success && cPass.safeParse(password).success){

        Admin.findOne({
            username,
            password
        })
        .then((val)=>{
            if (val){
                next()
            }else{
                res.status(403).json({admin: "Admin not found!"})
            }
        })
    }
    


}

module.exports = adminMiddleware;