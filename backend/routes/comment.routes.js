const { addComment,
    getPostComments,
    deleteComment,
    updateComment}= require('../controllers/comment.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

router.post("/addComment/:postId", auth, addComment)
    .get("/getPostComments/:postId", getPostComments)
    .delete("/deleteComment/:commentId", auth, deleteComment)
    .put("/updateComment/:commentId", auth, updateComment)



module.exports = router;
