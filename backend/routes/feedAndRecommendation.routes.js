const express = require("express");
const router = express.Router();
const { getUserRecommendation } =
  require("../controllers/feedAndrecommendation.js")
const auth = require("../middleware/auth.js");

router.get("/userRecommendation",auth, getUserRecommendation);
router.get("/check", (req,res)=>{
   res.json({
    msg:"AIML"
   })
});

module.exports = router;
