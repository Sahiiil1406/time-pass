const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth.js') 
const { likeUnlikePost,
    likeDislikeComment,
    likeUnlikePoll}=require('../controllers/like.js')
const {mongoIdPathVariableValidator}=require('../validators/common.js')
const validate=require('../validators/main.js')


router.post("/likePost/:postId",mongoIdPathVariableValidator('postId'),validate,auth,likeUnlikePost)
router.post("/likeComment/:commentId",mongoIdPathVariableValidator('commentId'),validate,auth,likeDislikeComment)
router.post("/likePoll/:pollId",mongoIdPathVariableValidator('pollId'),validate,auth,likeUnlikePoll)

module.exports=router;