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
const {getUserByusername}=require("../controllers/profile.js")
const auth=require("../middleware/auth")
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





router.post("/signup",validateSignup(),validate,signupUser)
router.post("/login",validateLogin(),validate,loginUser)
router.get("/logout",logoutUser)
router.put("/update/:username",validateUpdate(),validate,auth,updateUser)
router.delete("/delete/:username",auth,checkUsernameParam(),validate,deleteUser)
router.get("/get/:username",checkUsernameParam(),validate,auth,getUserByusername)
      
router.get("/api/allUser",getAllUsers)

router.get("/hello",auth,(req,res)=>res.json({
    msg:"Hello World!",reqUser:req.user._id}))

router.post("/generateOTP",validateGenerateOTP(),validate,generateOTP)
router.post("/verifyOTP",validateVerifyOTP(),validate,verifyOTP)
router.post("/resetPassword",validateResetPassword(),validate,resetPassword)

module.exports=router