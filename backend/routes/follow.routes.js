const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth.js')
const {followUnfollowUser,
    getFollowersListByUserName,
  getFollowingListByUserName}=require('../controllers/follow.js')


router.post("/:username",auth,followUnfollowUser)    
.get("/followers/:username",auth,getFollowersListByUserName)
.get("/following/:username",auth,getFollowingListByUserName)

module.exports=router;