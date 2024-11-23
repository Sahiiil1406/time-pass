const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const SocialFollow = require("../models/follow.js");



const blockCheck=async (req,res,next)=>{
    try {
        const { username} = req.params;
        const toBeFollowed = await User.findOne({username
        });
        if (!toBeFollowed) {
            return res.status(404).json({
                msg: "User not found",
            });
        }
       
        const loginUserId=req.user._id
        const userFromParams=toBeFollowed._id
        const check1=await SocialFollow.findOne({
            $and:[{followerId:loginUserId},
                {followeeId:userFromParams},
                {isBlocked:true}]
        }) || false
        
        const check2=await SocialFollow.findOne({
            $and:[{followerId:userFromParams},
                {followeeId:loginUserId},
                {isBlocked:true}]
        }) || false
        //console.log(check1,check2);
        if(check1 || check2){
            return res.status(400).json({
                msg: "Blocked by user",
            });
        }
        next();

        
    } catch (error) {
        return res.status(400).json({
            msg:"Error in checking block"
        })
    }
}

module.exports=blockCheck