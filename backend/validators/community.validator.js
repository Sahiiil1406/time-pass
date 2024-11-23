const {body,param}=require('express-validator')

const createCommunityValidator=()=>{
    return [
        body('name')
        .notEmpty()
        .withMessage("Name is required")
        .isString(),

        body('description')
        .isString()
        .withMessage("Description should be string"),

        body('category')
        .notEmpty()
        .withMessage("Category is required")
        .isString(),

    ]
}
const updateCommunityValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId(),

        body('name')
        .isString(),

        body('description')
        .isString(),

        body('category')
        .isString(),

    ]
}
const deleteCommunityValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}

const getCommunityMembersValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}
const getCommunityAdminsValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}

const getCommunityValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}
const getAllMembersOfCommunityValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}
const addorRemoveAdminValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId(),

        param('memberId')
        .notEmpty()
        .withMessage("User Id is required")
        .isMongoId()
    ]
}

const addorRemoveMemberValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId(),

        param('memberId')
        .notEmpty()
        .withMessage("User Id is required")
        .isMongoId()
    ]
}

const joinOrLeaveCommunityValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}

const searchCommunityValidator=()=>{
    return [
        body('search')
        .isString()
    ]
}

const getCommunityPostsValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}

const getCommunityPollsValidator=()=>{
    return [
        param('communityId')
        .notEmpty()
        .withMessage("Community Id is required")
        .isMongoId()
    ]
}

module.exports={
    createCommunityValidator,
    updateCommunityValidator,
    deleteCommunityValidator,
    getCommunityMembersValidator,
    getCommunityAdminsValidator,
    getCommunityValidator,
    getAllMembersOfCommunityValidator,
    addorRemoveAdminValidator,
    addorRemoveMemberValidator,
    joinOrLeaveCommunityValidator,
    searchCommunityValidator,
    getCommunityPostsValidator,
    getCommunityPollsValidator
}