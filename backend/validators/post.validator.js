const {body,param}=require("express-validator")


const createPostValidator=()=>{
    return [
        body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString(),


        body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")

    ]
}

const updatePostValidator=()=>{
    return [
        body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString(),


        body("tags")
        .optional()
        .isArray()
        .withMessage("Tags must be an array"),

        param("postId")
        .notEmpty()
        .withMessage("PostId is required")
        .withMessage("Invalid PostId")

    ]
}

const deletePostValidator=()=>{
    return [
       param("postId")
        .notEmpty()
        .withMessage("PostId is required")
        .withMessage("Invalid PostId")
        
    ]
}

const getPostByIdValidator=()=>{
    return [
        param("postId")
        .notEmpty()
        .withMessage("PostId is required")
    ]
}
const getUserPostValidator=()=>{
    return [
        param("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
    ]
}

module.exports={
    createPostValidator,
    deletePostValidator,
    updatePostValidator,
    getPostByIdValidator,
    getUserPostValidator
}
