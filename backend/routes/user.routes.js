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


router.post("/signup",signupUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.put("/update/:username",auth,updateUser)
      .delete("/delete/:username",auth,deleteUser)
router.get("get/:username",getUserByusername)
      
router.get("/api/allUser",getAllUsers)

router.get("/hello",auth,(req,res)=>res.json({
    msg:"Hello World!",reqUser:req.user._id}))

router.post("/generateOTP",generateOTP)
router.post("/verifyOTP",verifyOTP)
router.post("/resetPassword",resetPassword)

module.exports=router