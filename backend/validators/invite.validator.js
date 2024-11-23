const {body,param}=require('express-validator')

const sendInviteforTeamValidator=()=>{
    return [
        param('teamId')
        .notEmpty()
        .withMessage('Team Id is required')
        .isMongoId(),

        body('userId')
        .notEmpty()
        .withMessage('User Id is required')
        .isMongoId()
    ]
}

const acceptInviteforTeamValidator=()=>{
    return [
        param('inviteId')
        .notEmpty()
        .withMessage('Invite Id is required')
        .isMongoId()
    ]
}

const rejectInviteforTeamValidator=()=>{
    return [
        param('inviteId')
        .notEmpty()
        .withMessage('Invite Id is required')
        .isMongoId()
    ]
}

const joinTeamwithoutInviteforTeamValidator=()=>{
    return [
        param('teamId')
        .notEmpty()
        .withMessage('Team Id is required')
        .isMongoId()
    ]
}

module.exports={
    sendInviteforTeamValidator,
    acceptInviteforTeamValidator,
    rejectInviteforTeamValidator,
    joinTeamwithoutInviteforTeamValidator
}