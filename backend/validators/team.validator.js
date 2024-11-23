const {body,param} = require('express-validator');

const createTeamValidator = ()=>{
    return [
        body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString(),

        body('description')
        .isString()
        .withMessage('Description is required'),
        

        body('open')
        .isBoolean()
        .withMessage('It should be boolean'),
         
        body('maxSize')
        .isNumeric()
        .withMessage('Max size is required'),

        body('members')
        .isArray()
        .withMessage('Members should be an array')

    ]
}

const deleteTeamValidator = ()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isMongoId()
    ]
}

const updateTeamValidator = ()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isMongoId(),

        body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString(),

        body('description')
        .isString()
        .withMessage('Description is required'),
        

        body('open')
        .isBoolean()
        .withMessage('It should be boolean'),
         
        body('maxSize')
        .isNumeric()
        .withMessage('Max size is required'),

        body('members')
        .isArray()
        .withMessage('Members should be an array')

    ]
}

const getTeamValidator = ()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isMongoId()
    ]
}

const teamTaskCompltedValidator = ()=>{
    return [
        param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isMongoId(),

        body('userId')
        .isMongoId()
        .notEmpty()
        .withMessage('UserId is required')
    ]
}

const addMemberbyIdThroughPostValidator = ()=>{
    return [
        param('postId')
        .notEmpty()
        .withMessage('PostId is required')
        .isMongoId()
    ]
}

module.exports={
    createTeamValidator,
    deleteTeamValidator,
    updateTeamValidator,
    getTeamValidator,
    teamTaskCompltedValidator,
    addMemberbyIdThroughPostValidator
}
