const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const SocialFollow = require("../models/follow.js");

const auth = async (req, res, next) => {
    try {
        const tempToken = req.cookies?.tempToken || req.body?.tempToken || req.headers?.authorization?.split(" ")[1];
        
        if(tempToken==undefined){
            return res.status(455).json({
                msg:"No tempToken found"
            })
        }
        if(!tempToken){
            return res.status(456).json({
                msg:"No tempToken found"
            })
        }

        const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
        //console.log(decoded);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                msg: "No user found"
            });
        }
        req.user = user;
        //console.log("User found");
        next();
    }catch (error) {
        return res.status(401).json({
            msg: "Please authenticate"
        });
    }
}


module.exports = auth;