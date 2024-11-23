const express=require("express")
const router=express.Router()
const {
    signupUser,
    loginUser,
    logoutUser,
    updateUser,
    getAllUsers,
    deleteUser,
    generateOTP,
    verifyOTP,
   resetPassword
}=require('../controllers/auth.js')
const {getUserByusername,mainfeed,checkUsernameUnique}=require("../controllers/profile.js")
const auth=require("../middleware/auth")
const blockCheck=require("../middleware/block")
const {
    validateSignup,
  validateLogin,
  validateUpdate,
  validateGenerateOTP,
  validateVerifyOTP,
  validateResetPassword,
  checkUsernameParam
    }=require("../validators/user.validator.js")
const validate=require("../validators/main.js")
const {getPresignedUrl} = require("../config/aws.js");
const { trendingPosts,followingPost,trendingPoll,followingPoll } = require("../controllers/feeds.js")

router.post("/signup",validateSignup(),validate,signupUser)
router.post("/login",validateLogin(),validate,loginUser)
router.post("/logout",logoutUser)
router.put("/update/:username",validateUpdate(),validate,auth,updateUser)
router.delete("/delete/:username",auth,checkUsernameParam(),validate,deleteUser)
router.get("/get/:username",checkUsernameParam(),validate,auth,getUserByusername)
      
router.get("/api/allUser",getAllUsers)
router.post("/generateOTP",validateGenerateOTP(),validate,generateOTP)
router.post("/verifyOTP",validateVerifyOTP(),validate,verifyOTP)
router.post("/resetPassword",validateResetPassword(),validate,resetPassword)

//feed
router.get("/feed/trendingPost",trendingPosts)
router.get("/feed/followingPost",auth,followingPost)
router.get("/feed/trendingPoll",trendingPoll)
router.get("/feed/followingPoll",auth,followingPoll)
router.get("/feed/mainfeed",mainfeed)

router.get("/checkUsernameUnique",checkUsernameUnique)


router.get("/hello",(req,res)=>{
    res.json("Hello")
})


//create a route for uploading profile picture
router.get("/presignedUrl",auth,async (req,res)=>{
    const key=Math.random().toString(36).substring(2)+".png"
    const url=await getPresignedUrl(key)
    const imageUrl=`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    return res.json({  
        presigned :url,
        image:imageUrl})
})

module.exports=router
