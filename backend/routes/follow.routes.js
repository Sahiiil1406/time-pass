const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth.js')
const {followUnfollowUser,
    getFollowersListByUserName,
    getFollowingListByUserName,}=require('../controllers/follow.js')


router.post("/:username",auth,followUnfollowUser)    
.get("/followers/:userName",getFollowersListByUserName)
.get("/following/:userName",getFollowingListByUserName)

module.exports=router;