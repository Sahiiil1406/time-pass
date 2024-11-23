const exppress = require('express');
const router = exppress.Router();
const auth=require("../middleware/auth")
const validate=require("../validators/main.js")
const {createPostValidator,
    updatePostValidator,
    deletePostValidator,
    getPostByIdValidator,
    getUserPostValidator
}=require("../validators/post.validator.js")


const {  createPost,
    deletePost,
    updatePost,
    getPostbyId,
    getPostOfUser
}=require("../controllers/post.js")

router.post("/create",createPostValidator(),validate,auth,createPost)
router.delete("/delete/:postId",deletePostValidator(),validate,auth,deletePost)
router.put("/update/:postId",updatePostValidator(),validate,auth,updatePost)
router.get("/get/:postId",getPostByIdValidator(),validate,auth,getPostbyId)
router.get("/getuserPost/:username",getUserPostValidator(),validate,auth,getPostOfUser)


module.exports = router;