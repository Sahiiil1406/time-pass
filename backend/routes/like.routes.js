const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth.js') 
const { likeUnlikePost,
    likeDislikeComment}=require('../controllers/like.js')

router.post("/likePost/:postId",auth,likeUnlikePost)
.get("/likePost/:postId",(req,res)=>{res.send("Hello")})
router.post("/likeComment/:commentId",auth,likeDislikeComment)

module.exports=router;