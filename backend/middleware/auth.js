const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            return res.status(400).json({
                msg:"No Token found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                msg: "No user found"
            });
        }
        req.user = user;
        next();
    }catch (error) {
        return res.status(401).json({
            msg: "Please authenticate"
        });
    }
}

module.exports = auth;