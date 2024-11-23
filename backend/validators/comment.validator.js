const {body,param} = require('express-validator');

const addPostCommentValidator = ()=>{
    return [
        param('postId')
        .notEmpty()
        .withMessage("Post Id is requires")
        .isMongoId(),

        body('content')
        .notEmpty()
        .withMessage("Content can't be empty")
        .isString()
    ]
}

const deleteCommentValidator=()=>{
    return [
        param('commentId')
        .notEmpty()
        .withMessage("Comment Id is required")
        .isMongoId()
    ]
}

const updateCommentValidator=()=>{
    return [
        param('commentId')
        .notEmpty()
        .withMessage("Comment Id is required")
        .isMongoId(),

        body('content')
        .notEmpty()
        .withMessage("Content can't be empty")
        .isString()
    ]
}

const addRepliestoCommentValidator=()=>{
    return [
        body('parentCommentId')
        .notEmpty()
        .withMessage("Comment Id is required")
        .isMongoId(),

        body('content')
        .notEmpty()
        .withMessage("Content can't be empty")
        .isString()
    ]
}

const addPollCommentValidator=()=>{
    return [
        param('pollId')
        .notEmpty()
        .withMessage("Poll Id is required")
        .isMongoId(),

        body('content')
        .notEmpty()
        .withMessage("Content can't be empty")
        .isString()
    ]
}

const getPostCommentsValidator=()=>{
    return [
        param('postId')
        .notEmpty()
        .withMessage("Post Id is required")
        .isMongoId()
    ]
}

const getPollCommentsValidator=()=>{
    return [
        param('pollId')
        .notEmpty()
        .withMessage("Poll Id is required")
        .isMongoId()
    ]
}

module.exports={
    addPostCommentValidator,
    deleteCommentValidator,
    updateCommentValidator,
    addRepliestoCommentValidator,
    addPollCommentValidator,
    getPostCommentsValidator,
    getPollCommentsValidator
}