const exppress = require('express');
const router = exppress.Router();
const auth=require("../middleware/auth")

const {  createPost,
    deletePost,
    updatePost,
    getPostbyId
}=require("../controllers/post.js")

router.post("/create",auth,createPost)
router.delete("/delete/:postId",auth,deletePost)
router.put("/update/:postId",auth,updatePost)
router.get("/get/:postId",auth,getPostbyId)
router.get("/get/:username",auth,getPostbyId)


module.exports = router;