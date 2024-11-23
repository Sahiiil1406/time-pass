const { addPostComment,
    getPostComments,
    deleteComment,
    updateComment,
    addPollComment,
    getPollComments,
    addRepliestoComment}= require('../controllers/comment.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {
    addPostCommentValidator,
    deleteCommentValidator,
    updateCommentValidator,
    addRepliestoCommentValidator,
    addPollCommentValidator,
    getPostCommentsValidator,
    getPollCommentsValidator
}= require('../validators/comment.validator.js');
const validate = require('../validators/main.js');


router.post("/addComment/:postId",addPostCommentValidator(),validate, auth, addPostComment)
    .get("/getPostComments/:postId",getPostCommentsValidator(),validate, getPostComments)

router.post("/addRepliestoComment",addRepliestoCommentValidator(),validate, auth, addRepliestoComment)    
    
router.delete("/deleteComment/:commentId",deleteCommentValidator(),validate, auth, deleteComment)
    .put("/updateComment/:commentId",updateCommentValidator(),validate, auth, updateComment)

router.post("/addPollComment/:pollId",addPollCommentValidator(),validate, auth, addPollComment)
    .get("/getPollComments/:pollId",getPollCommentsValidator(),validate, getPollComments)



module.exports = router;
