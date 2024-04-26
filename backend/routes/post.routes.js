const exppress = require('express');
const router = exppress.Router();
const auth=require("../middleware/auth")

const {createPost}=require("../controllers/post.js")

router.post("/create",auth,createPost)


module.exports = router;