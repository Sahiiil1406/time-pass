const {param}=require('express-validator')
const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth.js')
const {followUnfollowUser,
    getFollowersListByUserName,
  getFollowingListByUserName,
  blockOrUnblockUser,
  getBlockedUsersList}=require('../controllers/follow.js')
const validate=require('../validators/main.js')

const usernameParamValidator=()=>{
    return [
        param('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString()
    ]
}

router.post("/followAndUnfollow/:username",usernameParamValidator(),validate,auth,followUnfollowUser)    
.get("/followers/:username",usernameParamValidator(),validate,auth,getFollowersListByUserName)
.get("/following/:username",usernameParamValidator(),validate,auth,getFollowingListByUserName)
.post("/block/:username",usernameParamValidator(),validate,auth,blockOrUnblockUser)
.get("/blocked",auth,getBlockedUsersList)

module.exports=router;