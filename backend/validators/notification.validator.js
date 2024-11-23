const {body,param}=require('express-validator')

const createNotificationValidator=()=>{
    return [
        body('notificationType')
        .notEmpty()
        .withMessage('Notification type is required')
        .isString(),

        body('message')
        .notEmpty()
        .withMessage('Message is required')
        .isString(),

        body('postId')
        .optional()
        .isMongoId(),

        body('pollId')
        .optional()
        .isMongoId(),

        body('inviteId')
        .optional()
        .isMongoId()
    ]
}

module.exports={
    createNotificationValidator
}